import QRCode from 'react-qr-code';

const useQrCode = (qrCodeValue) => {
  return (
    <a onClick={() => console.log(qrCodeValue)}>
      <QRCode value={qrCodeValue} size={256} />
    </a>
  );
};

export default useQrCode;
