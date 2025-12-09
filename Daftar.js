/**
 * Fungsi untuk mengatur tombol mana yang aktif (berwarna biru) dan 
 * menyesuaikan field formulir (Nomor Server).
 * @param {HTMLElement} clickedButton - Tombol yang baru saja diklik.
 */
function setActiveRole(clickedButton, pageId) {
    // 1. Logika untuk mengubah gaya tombol aktif (tetap sama)
    const selectorId = (pageId === 'login') ? 'roleSelectorLogin' : 'roleSelectorRegister';
    const roleSelector = document.getElementById(selectorId);
    
    if (roleSelector) {
        const buttons = roleSelector.querySelectorAll('.role-button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        clickedButton.classList.add('active');
    }

    // 2. Logika untuk menyesuaikan field formulir (Hanya di halaman register)
    if (pageId === 'register') {
        const roleName = clickedButton.textContent.trim();
        const serverContainer = document.getElementById('nomorServerContainer');
        const serverInput = serverContainer.querySelector('input'); // Ambil elemen input di dalamnya

        if (roleName === 'Admin' || roleName === 'Customer Service') {
            // Tampilkan field Nomor Server
            serverContainer.style.display = 'block';
            serverInput.required = true; // Jadikan wajib diisi
        } else if (roleName === 'User') {
            // Sembunyikan field Nomor Server
            serverContainer.style.display = 'none';
            serverInput.required = false; // Jadikan tidak wajib diisi
            serverInput.value = ''; // Opsional: Kosongkan nilai untuk kebersihan
        }
    }
}

/**
 * Fungsi untuk menampilkan Pop-up (Modal)
 */
function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const messageElement = document.getElementById('alertMessage');
    
    messageElement.textContent = message;
    alertBox.style.display = 'block';
}

/**
 * Fungsi untuk menutup Pop-up (Modal)
 */
function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// Menutup modal jika user klik di luar kotak
window.onclick = function(event) {
    const modal = document.getElementById('customAlert');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/**
 * Fungsi Validasi Form Pendaftaran
 * Fungsi ini dipanggil saat tombol DAFTAR ditekan.
 */
function validateForm(event) {
    const termsCheckbox = document.getElementById('terms');

    if (!termsCheckbox.checked) {
        // Mencegah form untuk submit
        event.preventDefault(); 
        
        // Tampilkan pop-up peringatan
        showAlert("Setujui syarat dan ketentuan!");
        
        return false;
    }
    
    // Jika checkbox dicentang, izinkan form submit.
    return true; 
}
function validateForm(event) {
    const termsCheckbox = document.getElementById('terms');
    const roleSelector = document.getElementById('roleSelectorRegister');
    
    // Definisikan nomor server yang benar untuk setiap peran
    const CORRECT_SERVER_NUMBERS = {
        'Admin': '010109',
        'Customer Service': '101008'
    };

    // 1. Validasi Syarat & Ketentuan
    if (!termsCheckbox.checked) {
        event.preventDefault(); 
        showAlert("Setujui syarat dan ketentuan!");
        return false;
    }
    
    // 2. Mendapatkan Peran Aktif dan Nilai Nomor Server
    const activeRoleButton = roleSelector.querySelector('.role-button.active');
    // Ambil nama peran yang aktif (misalnya: "Admin" atau "User")
    const roleName = activeRoleButton ? activeRoleButton.textContent.trim() : ''; 

    const serverContainer = document.getElementById('nomorServerContainer');
    const serverInput = serverContainer.querySelector('input');
    // Ambil nilai yang dimasukkan, hilangkan spasi di awal/akhir
    const enteredServerNumber = serverInput.value.trim(); 

    // 3. Validasi Nomor Server (Hanya untuk Admin & Customer Service)
    if (roleName === 'Admin' || roleName === 'Customer Service') {
        const requiredNumber = CORRECT_SERVER_NUMBERS[roleName];

        // Cek apakah nomor server yang dimasukkan tidak sesuai dengan yang seharusnya
        if (enteredServerNumber !== requiredNumber) {
            event.preventDefault();
            showAlert("Nomor server salah!"); // Pesan peringatan yang diminta
            return false;
        }
        
        // Catatan: Karena field Nomor Server sudah diset 'required' di HTML,
        // validasi untuk input kosong akan otomatis dilakukan oleh browser
        // jika Anda belum mencentang checkbox.
    }
    
    // Jika semua validasi (checkbox & nomor server) lolos
    return true; 
    
}

// ... (Fungsi setActiveRole, showAlert, closeAlert tetap sama)
