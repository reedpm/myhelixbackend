import React from 'react';
import {FlatList} from 'react-native';
import SearchUser from './SearchUser';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';
import PropTypes from 'prop-types';

const SearchUserList = ({users, isConnection, isPrivate}) => {
  const {
    currentProfileID,
  } = useGlobalContext();

    const handleFollow = async(followProfileId) => {
        console.log("&&& in handle follow");
        if (isPrivate) { // private connection
          // send a request
          try {
            const response = await fetch(dbURI + `requests/followprivate/${followProfileId}/${currentProfileID}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                
              }),
            })
            if (!response.ok) {
              console.error('Failed to Follow Private');
            }
          } catch (error) {

          }
          
        } else { // public connection
              // send a request
          try {
            const response = await fetch(dbURI + `requests/followpublic/${followProfileId}/${currentProfileID}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                
              }),
            })
            if (!response.ok) {
              console.error('Failed to Follow public');
            }
          } catch (error) {

          }
        }
        console.log("handle pressed");

    }
    const handleUnfollow = async(followProfileId) => {
      if (isPrivate) { // private connection
        // automatically remove from follower/following list of recipentee
        // automatically remove from follower/following list of recipent
        // send a request
        console.log("is private?? ");
        try {
          const response = await fetch(dbURI + `requests/unfollowprivate/${followProfileId}/${currentProfileID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
            }),
          })
          if (!response.ok) {
            console.error('Failed to UnFollow Private');
          }
        } catch (error) {

        }

      } else { // public connection
        // automatically remove from follower list of recipentee
        // automatically remove from following list of recipent 
        try {
          const response = await fetch(dbURI + `requests/unfollowpublic/${followProfileId}/${currentProfileID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
            }),
          })
          if (!response.ok) {
            console.error('Failed to UnFollow public');
          }
        } catch (error) {

        }
        
      }
      console.log("handle pressed");

  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <SearchUser
          user={item}
          onFollow={() => handleFollow(item._id)}
          onUnfollow={() => handleUnfollow(item._id)}
          isConnection={isConnection}
          isPrivate={isPrivate}
        />
      )}
    />
  );
};

SearchUserList.propTypes = {
  users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.number],
        ).isRequired,
      }),
  ).isRequired,
  isConnection: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default SearchUserList;
