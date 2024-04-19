import React, { useState } from "react"

import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Modal, 
  TouchableOpacity 
} from "react-native";

import { Card } from "@rneui/themed";

import {fonts} from '../styles';
import { UI_COLOR } from "../GlobalContext";

const DeleteConfirm = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <Pressable
        onPress={handleShow}
        style={styles.buttonDelete}
        >
        <Modal visible={show} transparent>
          <TouchableOpacity
              style={styles.overlay}
              onPress={handleClose}
              >
                  {
                    props.canDelete ? (
                      <View style={styles.card}>
                        <Card.Title>Are you sure?</Card.Title>
                        <Card.Divider/>
                        <View style={styles.buttonGroup}>
                          <Pressable style={styles.button} onPress={handleClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                          </Pressable>
                          <Pressable style={styles.buttonDelete} onPress={props.handleDelete}>
                            <Text style={styles.buttonText}>{props.buttonText}</Text>
                          </Pressable>
                        </View>  
                      </View>
                    ) : (
                      <View style={styles.card}>
                        <Card.Title>Oops! This is your only public profile</Card.Title>
                        <Card.Divider/>
                        <Text style={styles.text}>You must have at least one public profile</Text>
                      </View>
                    )
                  }
                  
            </TouchableOpacity>
        </Modal>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    );
  }
  
const styles = StyleSheet.create({
  buttonDelete: {
    backgroundColor: UI_COLOR.PUBLIC,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: UI_COLOR.PERSONAL,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontFamily: fonts.regular,
    color: 'white',
    fontSize: 16,
    margin: 10,
  },
  text: {
    fontFamily: fonts.regular,
    color: 'black',
    fontSize: 16,
    margin: 10,
    textAlign: "center"
  },
  overlay: {
    width: "100%",
    height: "100%",
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "70%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderRadius: 20,
    padding: 20,
  },
  buttonGroup: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
  }
});

  export default DeleteConfirm;