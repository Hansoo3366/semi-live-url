export default function handler(req, res) {
    const allowedIPs = ['1.214.224.226']; // 허용된 IP 주소 목록
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!allowedIPs.includes(clientIP)) {
        return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ message: 'Access granted' });
}
