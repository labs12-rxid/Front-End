import React from 'react';
import ScanImage from './ScanImage';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.js';

export default function Scan({ data, setData, history, ...rest }) {
  // useEffect(() => {
  //   const checkVideo = async () => {
  //     let devices;
  //     if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
  //       try {
  //         devices = await navigator.mediaDevices.enumerateDevices();
  //         dispatch({
  //           type: 'hasVideo',
  //           payload: devices.filter(device => device.kind === 'videoinput')
  //             ? true
  //             : false
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };
  //   checkVideo();
  // }, [dispatch]);

  return (
    <ErrorBoundary>
      <ScanImage data={data} setData={setData} history={history} />
    </ErrorBoundary>
  );
}
