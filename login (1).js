// Variabel global untuk menyimpan peran yang dipilih.
// Diinisialisasi dengan 'Admin' karena itu adalah peran default yang aktif saat halaman dimuat.
let selectedRole = 'Admin'; 

/**
 * Fungsi untuk mengatur tombol mana yang aktif dan menyimpan peran yang dipilih.
 * @param {HTMLElement} clickedButton - Tombol yang baru saja diklik.
 */
function setActiveRole(clickedButton) {
    // 1. Dapatkan wadah semua tombol
    const roleSelector = document.getElementById('roleSelector');
    
    // 2. Dapatkan semua tombol dengan kelas 'role-button' di dalam wadah
    const buttons = roleSelector.querySelectorAll('.role-button');

    // 3. Loop melalui semua tombol
    buttons.forEach(button => {
        // Hapus kelas 'active' dari semua tombol
        button.classList.remove('active');
    });

    // 4. Tambahkan kelas 'active' hanya pada tombol yang baru saja diklik
    clickedButton.classList.add('active');

    // 5. SIMPAN PERAN YANG BARU DIPILIH
    // Mengambil nilai peran dari atribut data-role="...."
    selectedRole = clickedButton.getAttribute('data-role');
    
    // Hapus baris window.location.href = 'beranda.html'; dari sini
    // Navigasi akan dipindahkan ke fungsi handleLogin
}


/**
 * Fungsi yang dipanggil ketika tombol LOGIN diklik.
 * Ini yang menentukan ke mana pengguna dinavigasikan.
 * @param {Event} event - Objek event form submission.
 */
function handleLogin(event) {
    // Mencegah form melakukan submit default (mengirim data dan me-refresh halaman)
    event.preventDefault(); 

    // Tentukan URL tujuan berdasarkan peran yang telah disimpan di selectedRole
    let destinationUrl = '';

    switch (selectedRole) {
        case 'Admin':
            // Ganti 'admin_dashboard.html' dengan nama file halaman admin Anda
            destinationUrl = 'beranda_admin.html'; 
            break;
        case 'User':
            // Ganti 'user_profile.html' dengan nama file halaman user Anda
            destinationUrl = 'beranda.html'; 
            break;
        case 'CS':
            // Ganti 'cs_kontak.html' dengan nama file halaman customer service Anda
            destinationUrl = 'customer_service.html'; 
            break;
        default:
            // Jika tidak ada peran yang dipilih (seharusnya tidak terjadi)
            destinationUrl = 'index.html'; 
            break;
    }

    // Arahkan browser ke URL tujuan
    window.location.href = destinationUrl;
    
    // Mengembalikan false untuk memastikan form tidak melakukan submission default
    return false; 
}

// PENTING: Inisialisasi peran aktif saat pertama kali dimuat
// Ini memastikan selectedRole diatur dengan benar meskipun pengguna tidak mengklik tombol role.
document.addEventListener('DOMContentLoaded', () => {
    const defaultActiveButton = document.querySelector('.role-button.active');
    if (defaultActiveButton) {
        // Ambil peran dari tombol Admin yang aktif secara default
        selectedRole = defaultActiveButton.getAttribute('data-role');
    }
});

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