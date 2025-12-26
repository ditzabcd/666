const text = `SISTEM TELAH DIAMBIL ALIH JIKA ANDA TIDAK MEMBACA DAN LANGSUNG MENUTUP ITU SAMA SAJA BUNUH DIIR KARNA DATA DAN SEMUA SESI TELAH KAMI AMBIL JIKA ANDA TIDAK MEMBACA KAMI AKAN MELANCARKAN SERANGAN. Kami telah menanamkan exploit melalui IP Anda. Kami tahu semua rahasia Anda. Seluruh isi GALERI (Foto & Video pribadi) telah kami salin ke server kami. Kami memiliki akses penuh ke akun FACEBOOK, GOOGLE, dan seluruh sinkronisasi WHATSAPP Anda. Kami tahu siapa orang-orang yang Anda sayangi, dan kami akan mengirimkan seluruh data memalukan Anda kepada mereka dalam 5 menit jika Anda tidak menghubungi admin. Jangan mencoba mematikan perangkat, proses upload berjalan di background... ANDA TIDAK BISA SEMBUNYI ANDA TIDAK BISA LARI ANDA TIDAK BISA PERGI SYSTEM TELAH BERJALAN DI SEMUA BACKGROUND BAHKAN JIKA ANDA MERESET SYSTEM ANDA SAMA SAJA BUNUH DIIR TIDAK ADA YANG BISA MENYELAMATKAN MU KECUALI DIRI ANDA SENDIRI DAN BERSEDIA DENGAN KONSEKUENSI NYA ./D404.`;

function startPanic() {
    const audio = document.getElementById('beep-bom');
    audio.play(); // Suara meledak saat layar disentuh pertama kali
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
}

// Deteksi IP
fetch('https://api.ipify.org?format=json')
    .then(r => r.json()).then(d => document.getElementById('user-ip').innerText = d.ip);

// Deteksi Device
document.getElementById('device-info').innerText = navigator.platform + (navigator.userAgent.includes("Android") ? " (Android)" : " (iOS)");

// Typing Effect
let i = 0;
function type() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 35);
    }
}
type();

// Fake Logs Sensitif
const logs = [
    "[INFO] Accessing /Media/WhatsApp/Images...",
    "[INFO] Dumping Google Account Tokens...",
    "[INFO] FB Session Hijacked...",
    "[INFO] Extracting Gallery/DCIM...",
    "[WARN] Bypassing 2FA Verification...",
    "[INFO] Private Photos Found: 1,842 files."
];
let l = 0;
setInterval(() => {
    let p = document.createElement("p");
    p.innerText = "> " + logs[l % logs.length];
    document.getElementById('logs').appendChild(p);
    document.getElementById('logs').scrollTop = document.getElementById('logs').scrollHeight;
    l++;
}, 1200);

// Timer 5 Menit
// Timer 5 Menit dengan Efek Kiamat
let t = 3600 
const timerInterval = setInterval(() => {
    let m = Math.floor(t/60), s = t%60;
    document.getElementById('clock').innerText = `${m}:${s<10?'0'+s : s}`;
    
    if (t <= 0) {
        clearInterval(timerInterval);
        kiamatDigital(); // Panggil fungsi saat waktu habis
    }
    t--;
}, 1000);

function kiamatDigital() {
    // 1. Ubah Background jadi Merah Darah & Putih Kedap-kedip
    document.body.style.backgroundColor = "red";
    document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; text-align:center; color:white; font-family:sans-serif;">
            <h1 style="font-size:3rem; margin:0;">SYSTEM DESTROYED</h1>
            <p style="font-size:1.5rem;">DATA ANDA TELAH KAMI KUNCI DAN AKAN KAMI JADIKAN SESUATU HANYA ADA 1 HARAPAN HUBUNGIWA INI..</p>
            <div style="width:80%; height:20px; border:2px solid white; margin-top:20px;">
                <div style="width:100%; height:100%; background:white; animation: load 2s infinite;"></div>
            </div>
            <p style="margin-top:20px;">IP: ${document.getElementById('user-ip').innerText} - LOGGED & REPORTED</p>
        </div>
        <style>
            @keyframes load { 0% { width: 0%; } 100% { width: 100%; } }
            body { animation: flash 0.1s infinite; }
            @keyframes flash { 0% { background: red; } 50% { background: black; } 100% { background: red; } }
        </style>
    `;

}