// Video URLs - SEMUA PAKAI LINK YANG SAMA SESUAI PERINTAH
const VIDEO_URLS = {
    intro: "https://files.catbox.moe/y803av.mp4",
    login: "https://files.catbox.moe/y803av.mp4", 
    loading: "https://files.catbox.moe/y803av.mp4",
    dashboard: "https://files.catbox.moe/y803av.mp4"
};

// DOM Elements
const introScreen = document.getElementById('introScreen');
const introVideo = document.getElementById('introVideo');
const introProgress = document.getElementById('introProgress');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sideMenu = document.getElementById('sideMenu');
const loginScreen = document.getElementById('loginScreen');
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loadingScreen = document.getElementById('loadingScreen');
const loadingVideo = document.getElementById('loadingVideo');
const loadingProgress = document.getElementById('loadingProgress');
const dashboard = document.getElementById('dashboard');
const dashboardVideo = document.getElementById('dashboardVideo');
const phoneInput = document.getElementById('phoneInput');
const bugSelect = document.getElementById('bugSelect');
const executeBtn = document.getElementById('executeBtn');
const menuLogin = document.getElementById('menuLogin');
const menuProfile = document.getElementById('menuProfile');
const menuChangePassword = document.getElementById('menuChangePassword');
const menuLogout = document.getElementById('menuLogout');
const profileModal = document.getElementById('profileModal');
const passwordModal = document.getElementById('passwordModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const toast = document.getElementById('toast');

// State Variables
let isLoggedIn = false;
let currentUser = null;

// Initialize App
function initApp() {
    console.log("🟣 DITZXSHADOW SYSTEM BOOTING...");
    
    // Set semua video dengan link yang sama
    introVideo.src = VIDEO_URLS.intro;
    introVideo.muted = false; // Auto-play lebih mudah jika muted
    introVideo.playsInline = true;
    introVideo.setAttribute('playsinline', '');
    introVideo.setAttribute('webkit-playsinline', '');
    
    // Start intro sequence
    startIntro();
    
    // Event Listeners
    setupEventListeners();
}

// Start Intro Sequence - OPTIMIZED FOR AUTO-PLAY
function startIntro() {
    console.log("🎬 Starting intro video...");
    
    // Coba play video
    const playVideo = () => {
        const playPromise = introVideo.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("✅ Intro video playing");
                    hideFallback();
                })
                .catch(error => {
                    console.log("⚠️ Auto-play blocked, showing fallback");
                    showFallback();
                });
        }
    };
    
    // Coba play sekarang
    playVideo();
    
    // Progress tracking
    introVideo.addEventListener('timeupdate', function() {
        if (introVideo.duration) {
            const progress = (introVideo.currentTime / introVideo.duration) * 100;
            introProgress.style.width = `${progress}%`;
            
            if (progress >= 100 || introVideo.currentTime >= 5) {
                finishIntro();
            }
        }
    });
    
    // Error handling
    introVideo.addEventListener('error', function(e) {
        console.log("❌ Video error:", e);
        // Skip intro kalau error
        setTimeout(finishIntro, 1000);
    });
    
    // Duration check
    introVideo.addEventListener('loadedmetadata', function() {
        console.log(`📏 Video duration: ${introVideo.duration}s`);
        // Jika video terlalu pendek/panjang, adjust
        if (introVideo.duration < 3) {
            // Video pendek, loop mungkin
            introVideo.loop = false;
        }
    });
    
    // Safety timeout
    setTimeout(finishIntro, 8000);
}

function finishIntro() {
    console.log("🏁 Finishing intro...");
    introVideo.pause();
    introScreen.style.opacity = '0';
    introScreen.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        showLoginScreen();
    }, 800);
}

function showFallback() {
    // Fallback UI jika video ga bisa play
    const fallbackHTML = `
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a, #2d0a5e);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            z-index: 10000;
        ">
            <div style="
                width: 100px;
                height: 100px;
                border: 3px solid #8a2be2;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
                animation: pulse 2s infinite;
            ">
                <i class="fas fa-play" style="font-size: 40px; color: #8a2be2;"></i>
            </div>
            <p style="font-size: 18px; color: #9d4edd; text-align: center;">
                Klik untuk memulai DITZXSHADOW
            </p>
            <button id="skipIntroBtn" style="
                margin-top: 20px;
                padding: 10px 30px;
                background: linear-gradient(90deg, #8a2be2, #9d4edd);
                border: none;
                border-radius: 10px;
                color: white;
                font-weight: bold;
                cursor: pointer;
            ">
                SKIP INTRO
            </button>
        </div>
    `;
    
    const fallbackDiv = document.createElement('div');
    fallbackDiv.innerHTML = fallbackHTML;
    fallbackDiv.id = 'videoFallback';
    introScreen.appendChild(fallbackDiv);
    
    // Click to play
    fallbackDiv.addEventListener('click', function() {
        introVideo.play().then(() => {
            hideFallback();
        }).catch(e => {
            console.log("Still can't play:", e);
            finishIntro();
        });
    });
    
    // Skip button
    document.getElementById('skipIntroBtn')?.addEventListener('click', function(e) {
        e.stopPropagation();
        finishIntro();
    });
}

function hideFallback() {
    const fallback = document.getElementById('videoFallback');
    if (fallback) {
        fallback.style.opacity = '0';
        setTimeout(() => {
            if (fallback.parentNode) {
                fallback.parentNode.removeChild(fallback);
            }
        }, 500);
    }
}

// Show Login Screen
function showLoginScreen() {
    console.log("🔐 Showing login screen");
    loginScreen.style.display = 'flex';
    
    const loginVideoElement = document.getElementById('loginVideo');
    loginVideoElement.src = VIDEO_URLS.login;
    loginVideoElement.muted = false;
    loginVideoElement.loop = true;
    loginVideoElement.playsInline = true;
    
    // Coba play login video
    setTimeout(() => {
        loginVideoElement.play().catch(e => {
            console.log("Login video autoplay blocked, but continuing...");
        });
    }, 300);
    
    // Focus ke input
    setTimeout(() => {
        usernameInput.focus();
    }, 500);
}

// Setup Event Listeners
function setupEventListeners() {
    // Hamburger Menu
    hamburgerMenu.addEventListener('click', toggleSideMenu);
    
    // Login
    loginBtn.addEventListener('click', handleLogin);
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    // Execute Bug
    executeBtn.addEventListener('click', executeBug);
    
    // Side Menu Items
    menuLogin.addEventListener('click', () => {
        if (!isLoggedIn) {
            showToast("Anda belum login!");
        } else {
            hideSideMenu();
            showToast("Anda sudah login!");
        }
    });
    
    menuProfile.addEventListener('click', () => {
        if (!isLoggedIn) {
            showToast("Silakan login terlebih dahulu!");
            return;
        }
        hideSideMenu();
        profileModal.style.display = 'flex';
    });
    
    menuChangePassword.addEventListener('click', () => {
        if (!isLoggedIn) {
            showToast("Silakan login terlebih dahulu!");
            return;
        }
        hideSideMenu();
        passwordModal.style.display = 'flex';
    });
    
    menuLogout.addEventListener('click', () => {
        if (!isLoggedIn) {
            showToast("Anda belum login!");
            return;
        }
        hideSideMenu();
        handleLogout();
    });
    
    // Modal Close Buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            profileModal.style.display = 'none';
            passwordModal.style.display = 'none';
        });
    });
    
    // Change Password
    changePasswordBtn.addEventListener('click', changePassword);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) profileModal.style.display = 'none';
        if (e.target === passwordModal) passwordModal.style.display = 'none';
    });
    
    // Phone input formatting
    phoneInput.addEventListener('input', formatPhoneNumber);
    
    // Video error handling untuk semua video
    const allVideos = [introVideo, document.getElementById('loginVideo'), loadingVideo, dashboardVideo];
    allVideos.forEach(video => {
        if (video) {
            video.addEventListener('error', function() {
                console.log(`Video ${video.id} error, using fallback`);
                // Kalau error, coba ganti dengan warna background
                video.style.display = 'none';
                const parent = video.parentElement;
                if (parent) {
                    parent.style.background = 'linear-gradient(45deg, #0a0a0a, #2d0a5e, #4a1e8a)';
                }
            });
        }
    });
}

// Toggle Side Menu
function toggleSideMenu() {
    sideMenu.classList.toggle('active');
    if (sideMenu.classList.contains('active')) {
        hamburgerMenu.innerHTML = '<i class="fas fa-times" style="font-size: 28px; color: var(--accent);"></i>';
    } else {
        hamburgerMenu.innerHTML = `
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
        `;
    }
}

function hideSideMenu() {
    sideMenu.classList.remove('active');
    hamburgerMenu.innerHTML = `
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
    `;
}

// Handle Login
function handleLogin() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showToast("Masukkan username terlebih dahulu!", "error");
        usernameInput.focus();
        return;
    }
    
    // Password hardcoded "ditz" sesuai permintaan bos-tuan besar
    const password = "ditz";
    
    // Simple authentication
    if (username && password === "ditz") {
        currentUser = username;
        isLoggedIn = true;
        
        // Hide login screen
        loginScreen.style.display = 'none';
        
        // Show loading screen
        showLoadingScreen();
    } else {
        showToast("Username atau password salah!", "error");
    }
}

// Show Loading Screen
function showLoadingScreen() {
    console.log("🔄 Showing loading screen");
    loadingScreen.style.display = 'flex';
    
    loadingVideo.src = VIDEO_URLS.loading;
    loadingVideo.muted = true;
    loadingVideo.playsInline = true;
    
    // Coba play
    setTimeout(() => {
        loadingVideo.play().catch(e => {
            console.log("Loading video play failed, but continuing...");
        });
    }, 100);
    
    // Simulasi loading dengan progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            finishLoading();
        }
    }, 30);
    
    // Juga track video progress
    loadingVideo.addEventListener('timeupdate', function() {
        if (loadingVideo.duration) {
            const videoProgress = (loadingVideo.currentTime / loadingVideo.duration) * 100;
            loadingProgress.style.width = `${videoProgress}%`;
            
            if (videoProgress >= 100) {
                clearInterval(interval);
                finishLoading();
            }
        }
    });
    
    // Safety timeout
    setTimeout(() => {
        clearInterval(interval);
        finishLoading();
    }, 5000);
}

function finishLoading() {
    console.log("✅ Loading complete");
    loadingScreen.style.display = 'none';
    showDashboard();
}

// Show Dashboard
function showDashboard() {
    console.log("📱 Showing dashboard");
    dashboard.style.display = 'block';
    
    dashboardVideo.src = VIDEO_URLS.dashboard;
    dashboardVideo.muted = true;
    dashboardVideo.loop = true;
    dashboardVideo.playsInline = true;
    
    // Coba play dashboard video
    setTimeout(() => {
        dashboardVideo.play().catch(e => {
            console.log("Dashboard video play failed, but UI continues...");
        });
    }, 200);
    
    // Set username in profile
    document.getElementById('profileUsername').textContent = currentUser;
    
    showToast(`🔥 Selamat datang, ${currentUser}! Akses penuh diberikan.`, "success");
}

// Format Phone Number
function formatPhoneNumber() {
    let value = phoneInput.value.replace(/\D/g, '');
    
    if (value.startsWith('0')) {
        value = '+62' + value.substring(1);
    }
    
    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\+\d{2})(\d{3})/, '$1 $2-');
    } else if (value.length > 7 && value.length <= 11) {
        value = value.replace(/(\+\d{2})(\d{3})(\d{4})/, '$1 $2-$3');
    } else if (value.length > 11) {
        value = value.replace(/(\+\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2-$3-$4');
    }
    
    phoneInput.value = value;
}

// Execute Bug
function executeBug() {
    const phoneNumber = phoneInput.value.trim();
    const selectedBug = bugSelect.value;
    
    if (!phoneNumber) {
        showToast("Masukkan nomor WhatsApp terlebih dahulu!", "error");
        phoneInput.focus();
        return;
    }
    
    if (!selectedBug) {
        showToast("Pilih jenis bug terlebih dahulu!", "error");
        bugSelect.focus();
        return;
    }
    
    const bugNames = {
        crashx: "Crash X",
        invisdelay: "Invis Delay",
        shadow: "Shadow",
        unli: "Unli",
        ditzvvip: "Ditzv VIP"
    };
    
    const bugColors = {
        crashx: "#ff4757",
        invisdelay: "#00d2d3",
        shadow: "#8a2be2",
        unli: "#00ff88",
        ditzvvip: "#ff9f43"
    };
    
    showToast(`🚀 Menjalankan ${bugNames[selectedBug]} pada ${phoneNumber}...`, "success");
    
    // Simulate execution dengan efek visual
    executeBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> EXECUTING...`;
    executeBtn.style.background = `linear-gradient(90deg, ${bugColors[selectedBug]}, #8a2be2)`;
    executeBtn.disabled = true;
    
    setTimeout(() => {
        executeBtn.innerHTML = `<i class="fas fa-bolt"></i> EXECUTE BUG`;
        executeBtn.style.background = `linear-gradient(90deg, var(--primary), #ff6ec7)`;
        executeBtn.disabled = false;
        
        showToast(`✅ Bug ${bugNames[selectedBug]} BERHASIL dijalankan! Target: ${phoneNumber}`, "success");
        
        // Log aktivitas
        console.log(`Bug executed: ${bugNames[selectedBug]} -> ${phoneNumber}`);
    }, 2000);
}

// Change Password
function changePassword() {
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    
    if (!currentPass || !newPass || !confirmPass) {
        showToast("Isi semua field terlebih dahulu!", "error");
        return;
    }
    
    if (currentPass !== "ditz") {
        showToast("Password saat ini salah!", "error");
        return;
    }
    
    if (newPass !== confirmPass) {
        showToast("Password baru tidak cocok!", "error");
        return;
    }
    
    // Simpan password baru (dalam real app, ini ke server)
    showToast("🔐 Password berhasil diubah! Sistem restart...", "success");
    
    // Animasi
    changePasswordBtn.innerHTML = `<i class="fas fa-check"></i> BERHASIL`;
    changePasswordBtn.style.background = "linear-gradient(90deg, #00ff88, #00d2d3)";
    
    setTimeout(() => {
        passwordModal.style.display = 'none';
        changePasswordBtn.innerHTML = `<i class="fas fa-save"></i> SIMPAN PERUBAHAN`;
        changePasswordBtn.style.background = "linear-gradient(90deg, var(--primary), var(--accent))";
        
        // Clear fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }, 1500);
}

// Handle Logout
function handleLogout() {
    if (confirm("⚠️ Apakah Anda yakin ingin logout dari DITZXSHADOW?")) {
        isLoggedIn = false;
        currentUser = null;
        
        // Stop semua video
        [introVideo, loadingVideo, dashboardVideo].forEach(video => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        // Hide dashboard
        dashboard.style.display = 'none';
        
        // Clear inputs
        usernameInput.value = '';
        phoneInput.value = '';
        bugSelect.selectedIndex = 0;
        
        // Show login screen
        loginScreen.style.display = 'flex';
        hideSideMenu();
        
        // Play login video lagi
        const loginVideo = document.getElementById('loginVideo');
        if (loginVideo) {
            loginVideo.play().catch(e => console.log("Login video autoplay blocked"));
        }
        
        showToast("👋 Anda telah logout dari sistem", "info");
    }
}

// Show Toast Notification
function showToast(message, type = "info") {
    toast.textContent = message;
    
    // Set color based on type
    if (type === "error") {
        toast.style.borderLeftColor = "#ff4757";
        toast.style.background = "linear-gradient(135deg, #2d0a0a, #5e0a2d)";
    } else if (type === "success") {
        toast.style.borderLeftColor = "#00ff88";
        toast.style.background = "linear-gradient(135deg, #0a2d1a, #0a5e3a)";
    } else {
        toast.style.borderLeftColor = "var(--accent)";
        toast.style.background = "var(--gradient-purple)";
    }
    
    toast.style.display = 'block';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            toast.style.display = 'none';
            toast.style.opacity = '1';
        }, 500);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add CSS animation for fallback
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// APK Info
console.log(`
══════════════════════════════════════
🩸 DITZXSHADOW SYSTEM v1.0
══════════════════════════════════════
VIDEO SUMBER: https://files.catbox.moe/y803av.mp4
STATUS: Semua video menggunakan link yang sama
AUTO-PLAY: Muted untuk bypass browser restriction
FALLBACK: UI tersedia jika video gagal
APK READY: WebView compatible
══════════════════════════════════════
Untuk APK: cordova build android
File: www/index.html + www/style.css + www/script.js
══════════════════════════════════════
`);