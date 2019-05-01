import React from 'react';

const DiaryEntry = ({ diaryEntry }) => {
  return (
    <div className='diaryEntry'>
      <h2>{diaryEntry.med_name}</h2>
      <p>diary_date: {diaryEntry.diary_date}</p>
      <p>diary_emoji: {diaryEntry.diary_emoji}</p>
      <p>diary_text: {diaryEntry.diary_text}</p>
    </div>
  );
};

export default DiaryEntry;
