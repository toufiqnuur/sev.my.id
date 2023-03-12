import { Box, Button, ModalBody, ModalFooter, Text } from "@chakra-ui/react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function ModalQrCode({ shortUrl }) {
  const canvasRef = useRef(null);

  const downloadImage = () => {
    const canvas = canvasRef.current?.children[0];
    const anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = `sev_qrcode ${+new Date()}`;
    anchor.click();
  };

  return (
    <>
      <ModalBody>
        <Box mx="auto" w={256} ref={canvasRef} my="8">
          <QRCodeCanvas
            value={shortUrl}
            level="M"
            size={256}
            imageSettings={{
              src: "/favicon.png",
              height: 64,
              width: 64,
              excavate: true,
            }}
          />
        </Box>
        <Text align="center">{shortUrl}</Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="teal" onClick={downloadImage}>
          Download
        </Button>
      </ModalFooter>
    </>
  );
}
