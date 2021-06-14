const password = process.env.Password_DB
const DbUrl = 'mongodb+srv://admin:'+password+'@cluster0.7pbr4.mongodb.net/oneup_version?retryWrites=true&w=majority';
const DbName = 'oneup_version';

const soItemMoiPage = 8;
const soItemMoiPageCategory = 16;
const soItemMoiPageAdmin = 4;
const phanTramLoiNhuan = 10;


// Table

const user = 'NguoiDung';
const voucher = 'MaGiamGia';
const product = 'SanPham';
const order = 'DonHang';
const producttype = 'PhanLoaiSanPham';
const orderdetail = 'ChiTietDonHang';
const comment = 'NhanXetKhachHang';
const orderhistorydetail = 'LichSuDonHang';
const News = 'BaiViet';
const brands = 'ThuongHieu';
const question = 'CauHoiKhachHang';
const category = 'DanhMucSanPham';
const datasearch = 'TimKiem';
const country = 'QuocGia';
const local = 'KhuVuc'

module.exports = {
    DbUrl, DbName, soItemMoiPage, soItemMoiPageAdmin, soItemMoiPageCategory,
    phanTramLoiNhuan, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local
};

// Get first two documents that match the query
// .limit(2)


//hàm shuffle
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }