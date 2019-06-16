import React from 'react';

const PillCard = ({ med, medImage }) => {
  return (
    <div className='pill-card'>
      <p className='dot'>•</p>
      <img
        className='pill-image'
        src={medImage || require('../../../assets/logo.png')}
        alt='your pill'
      />
      <div className='text-content'>
        <div className='pill-name'>{med.med_name || 'name'}</div>
        {med.med_strength && med.med_strength_unit
          ? med.med_strength + ' ' + med.med_strength_unit
          : 'dose'}
        {' | '}
        {med.med_color || 'color'}
        {' | '}
        {med.med_shape || 'shape'}
      </div>
    </div>
  );
};

export default PillCard;
