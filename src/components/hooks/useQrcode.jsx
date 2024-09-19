import QRCode from 'react-qr-code';

const useQrCode = (qrCodeValue) => {
  return <QRCode value={qrCodeValue} size={256} />;
};

export default useQrCode;
