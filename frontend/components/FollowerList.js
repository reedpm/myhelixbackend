import React from 'react';
import {FlatList} from 'react-native';
import Follower from './Follower';
import PropTypes from 'prop-types';


const FollowerList = ({users}) => {
  return (
    <FlatList
      nestedScrollEnabled={true}
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <Follower
          user={item}
        />
      )}
    />
  );
};

FollowerList.propTypes = {
  users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.number],
        ).isRequired,
      }),
  ).isRequired,
};

export default FollowerList;
