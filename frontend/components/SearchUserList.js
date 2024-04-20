import React from 'react';
import {FlatList} from 'react-native';
import SearchUser from './SearchUser';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';
import PropTypes from 'prop-types';

const SearchUserList = ({users, isConnection, isPrivate, isRequest}) => {
  const {
    currentProfileID,
  } = useGlobalContext();

    const handleDeleteRequest = async(followProfileId, requestId) => {
      try {
        const response = await fetch(dbURI + `requests/deleterequest/${followProfileId}/${currentProfileID}/${requestId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            
          }),
        })
        if (!response.ok) {
          console.error('Failed to delet');
        }
      } catch (error) {

      }
      
    }

    const handleFollow = async(followProfileId) => {
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

    }
    const handleUnfollow = async(followProfileId) => {
      if (isPrivate) { // private connection
        // automatically remove from follower/following list of recipentee
        // automatically remove from follower/following list of recipent
        // send a request
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
          onDeleteRequest={() => handleDeleteRequest(item.recipients._id, item.requestId)}
          isConnection={isConnection}
          isPrivate={isPrivate}
          isRequest={isRequest}
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
