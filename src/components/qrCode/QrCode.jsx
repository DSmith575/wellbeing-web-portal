import QRCode from 'react-qr-code';
import { useDownloadQRCode } from '../hooks/useDownloadQrCode';

const QrCode = ({ qrCodeValue }) => {
  const { svgRef, downloadQRCode } = useDownloadQRCode(qrCodeValue);
  return (
    <>
      <div ref={svgRef}>
        <QRCode value={qrCodeValue.id || qrCodeValue} size={256} />
      </div>
      <button
        className={'mt-4 bg-green-500 text-white px-4 py-2 rounded-md'}
        onClick={downloadQRCode}>
        Download QR Code
      </button>
    </>
  );
};

export default QrCode;
