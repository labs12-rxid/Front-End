import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchDiary } from '../../actions';
import DiaryEntry from '../Diary/DiaryEntry';

const Diary = ({ fetchDiary, user_id, diary }) => {
  useEffect(() => {
    fetchDiary(user_id);
  }, [user_id, fetchDiary]);

  return (
    <div className='diary'>
      {diary.length > 0 ? (
        <div>
          <h2>Diary:</h2>
          {diary.map(diaryEntry => (
            <DiaryEntry key={diaryEntry.id} diaryEntry={diaryEntry} />
          ))}
        </div>
      ) : (
        <h2>Loading Diary...</h2>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  diary: state.diary,
  fetchingDiary: state.fetchingDiary,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchDiary }
)(Diary);
