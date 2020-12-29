import { createHash, createHmac } from "crypto";
const node_mac = (gim) => {
  console.log(gim)
  const now = new Date();
  const ts = now.getTime();
  const ver = "2.0.1";
  const channel = "vegetable"
  const _keyMd5 = createHash("md5").update(gim.replace(/8/g, "")).digest('hex')
  const _bytesMd5 = createHash("md5").update(channel + ver + ts).digest('hex')
  let _keyMd5HexArray = []
  for (let i = 0; i < _keyMd5.length; i += 2) {
    _keyMd5HexArray.push(parseInt(`${_keyMd5[i]}${_keyMd5[i + 1]}`, 16))
  }
  const _keyMd5Uint8Array = Uint8Array.from(_keyMd5HexArray)
  let _bytesMd5HexArray = []
  for (let i = 0; i < _bytesMd5.length; i += 2) {
    _bytesMd5HexArray.push(parseInt(`${_bytesMd5[i]}${_bytesMd5[i + 1]}`, 16))
  }
  const _bytesMd5Uint8Array = Uint8Array.from(_bytesMd5HexArray)
  const _hMac = createHmac("sha256", Buffer.from(_keyMd5Uint8Array)).update(Buffer.from(_bytesMd5Uint8Array)).digest("hex")
  const _hMacMd5 = createHash("md5").update(_hMac).digest('hex')
  const _hMacMd5Reverse = _hMacMd5.replace(/8/g, "").split("").reverse().join("");
  const mac = Buffer.from(_hMacMd5Reverse).toString('base64')
  return {
    ts, ver, gim, mac, channel
  }
}

export default node_mac;