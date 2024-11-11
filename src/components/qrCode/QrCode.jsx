import QRCode from "react-qr-code";
import { useDownloadQRCode } from "../hooks/useDownloadQrCode";
import Button from "../../buttons/Button";

const QrCode = ({ qrCodeValue, hideQr }) => {
  const { svgRef, downloadQRCode } = useDownloadQRCode(qrCodeValue);
  return (
    <>
      <image ref={svgRef}>
        <QRCode
          className={`rounded-lg shadow-md ${hideQr ? "hidden" : ""}`}
          value={qrCodeValue.id || qrCodeValue}
          size={256}
        />
      </image>
      <Button
        styles={`bg-green-500 hover:bg-green-400`}
        onClick={downloadQRCode}
        children={"Download QR Code"}
      />
    </>
  );
};

export default QrCode;
