import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Signature = () => {
  const signatureRef = useRef();

  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
      />
      <button onClick={() => signatureRef.current.clear()}>Effacer la signature</button>
    </div>
  );
};

export default Signature;
