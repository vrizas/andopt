<script setup>
import { ref } from 'vue';
import AutoCompleteList from '../../components/desktop/AutoCompleteList.vue';

const cityInput = ref(null);
const autoCompleteList = ref(null);
const autoCompleteListVisible = ref(false);
const cities = ref([
  'Aceh',
  'Aceh Barat, Aceh',
  'Aceh Barat Daya, Aceh',
  'Aceh Besar, Aceh',
  'Aceh Jaya, Aceh',
  'Aceh Selatan, Aceh',
  'Aceh Singkil, Aceh',
  'Aceh Tamiang, Aceh',
  'Aceh Tengah, Aceh',
  'Aceh Tenggara, Aceh',
  'Aceh Timur, Aceh',
  'Aceh Utara, Aceh',
  'Bener Meriah, Aceh',
  'Biruen, Aceh',
  'Gayo Lues, Aceh',
  'Nagan Raya, Aceh',
  'Pidie, Aceh',
  'Pidie Jaya, Aceh',
  'Simeulue, Aceh',
  'Banda Aceh',
  'Langsa, Aceh',
  'Lhokseumawe, Aceh',
  'Sabang, Aceh',
  'Subulussalam, Aceh',
  'Sumatra Utara',
  'Asahan, Sumatra Utara',
  'Batu Bara, Sumatra Utara',
  'Dairi, Sumatra Utara',
  'Deli Serdang, Sumatra Utara',
  'Humbang Hasundutan, Sumatra Utara',
  'Karo, Sumatra Utara',
  'Labuhanbatu, Sumatra Utara',
  'Labuhanbatu Selatan, Sumatra Utara',
  'Labuhanbatu Utara, Sumatra Utara',
  'Langkat, Sumatra Utara',
  'Mandailing Natal, Sumatra Utara',
  'Nias, Sumatra Utara',
  'Nias Barat, Sumatra Utara',
  'Nias Selatan, Sumatra Utara',
  'Nias Utara, Sumatra Utara',
  'Padang Lawas, Sumatra Utara',
  'Padang Lawas Utara, Sumatra Utara',
  'Pakpak Bharat, Sumatra Utara',
  'Samosir, Sumatra Utara',
  'Serdang Bedagai, Sumatra Utara',
  'Simalungun, Sumatra Utara',
  'Tapanuli Selatan, Sumatra Utara',
  'Tapanuli Tengah, Sumatra Utara',
  'Tapanuli Utara, Sumatra Utara',
  'Toba, Sumatra Utara',
  'Binjai, Sumatra Utara',
  'Gunungsitoli, Sumatra Utara',
  'Medan, Sumatra Utara',
  'Padang Sidempuan, Sumatra Utara',
  'Pematang Siantar, Sumatra Utara',
  'Sibolga, Sumatra Utara',
  'Tanjungbalai, Sumatra Utara',
  'Tebing Tinggi, Sumatra Utara',
  'Sumatra Barat',
  'Agam, Sumatra Barat',
  'Dharmasraya, Sumatra Barat',
  'Kepulauan Mentawai, Sumatra Barat',
  'Lima Puluh Kota, Sumatra Barat',
  'Padang Pariaman, Sumatra Barat',
  'Pasaman, Sumatra Barat',
  'Pasaman Barat, Sumatra Barat',
  'Pesisir Selatan, Sumatra Barat',
  'Sijunjung, Sumatra Barat',
  'Solok, Sumatra Barat',
  'Tanah Datar, Sumatra Barat',
  'Bukit Tinggi, Sumatra Barat',
  'Padang, Sumatra Barat',
  'Padang Panjang, Sumatra Barat',
  'Pariaman, Sumatra Barat',
  'Payukumbuh, Sumatra Barat',
  'Sawahlunto, Sumatra Barat',
  'Kota Solok, Sumatra Barat',
  'Riau',
  'Bengkalis, Riau',
  'Indragiri Hilir, Riau',
  'Indragiri Hulu, Riau',
  'Kampar, Riau',
  'Kepulauan Meranti, Riau',
  'Kuantan Singingi, Riau',
  'Pelalawan, Riau',
  'Rokan Hilir, Riau',
  'Rokan Hulu, Riau',
  'Siak, Riau',
  'Dumai, Riau',
  'Pekanbaru, Riau',
  'Kepulauan Riau',
  'Bintan, Kepulauan Riau',
  'Karimun, Kepulauan Riau',
  'Kepulauan Anambas, Kepulauan Riau',
  'Lingga, Kepulauan Riau',
  'Natuna, Kepulauan Riau',
  'Batam, Kepulauan Riau',
  'Tanjung Pinang, Kepulauan Riau',
  'Jambi',
  'Batanghari, Jambi',
  'Bungo, Jambi',
  'Kerinci, Jambi',
  'Merangin, Jambi',
  'Muaro Jambi, Jambi',
  'Sarolangun, Jambi',
  'Tanjung Jambung Barat, Jambi',
  'Tanjung Jambung Timur, Jambi',
  'Tebo, Jambi',
  'Kota Jambi',
  'Sungai Penuh, Jambi',
  'Bengkulu',
  'Bengkulu Selatan',
  'Bengkulu Tengah',
  'Bengkulu Utara',
  'Kaur, Bengkulu',
  'Kepahiang, Bengkulu',
  'Lebong, Bengkulu',
  'Mukomuko, Bengkulu',
  'rejang Lebong, Bengkulu',
  'Seluma, Bengkulu',
  'Kota Bengkulu',
  'Sumatra Selatan',
  'Banyuasin, Sumatra Selatan',
  'Empat Lawang, Sumatra Selatan',
  'Lahat, Sumatra Selatan',
  'Muara Enim, Sumatra Selatan',
  'Musi Banyuasin, Sumatra Selatan',
  'Musi Rawas, Sumatra Selatan',
  'Musi Rawas Utara, Sumatra Selatan',
  'Ogan lir, Sumatra Selatan',
  'Ogan Komering Ilir, Sumatra Selatan',
  'Ogan Komering Ulu, Sumatra Selatan',
  'Ogan Komering Ulu Selatan, Sumatra Selatan',
  'Ogan Komering Ulu Timur, Sumatra Selatan',
  'Penukang Abab Pematang Ilir, Sumatra Selatan',
  'Lubuklinggau, Sumatra Selatan',
  'Pagar Alam, Sumatra Selatan',
  'Palembang, Sumatra Selatan',
  'Prabumulih, Sumatra Selatan',
  'Kepulauan Bangka Belitung',
  'Bangka, Kepulauan Bangka Belitung',
  'Bangka Barat, Kepulauan Bangka Belitung',
  'Bangka Selatan, Kepulauan Bangka Belitung',
  'Bangka Tengah, Kepulauan Bangka Belitung',
  'Belitung, Kepulauan Bangka Belitung',
  'Belitung Timur, Kepulauan Bangka Belitung',
  'Pangkal Pinang, Kepulauan Bangka Belitung',
  'Lampung',
  'Lampung Barat',
  'Lampung Selatan',
  'Lampung Tengah',
  'Lampung Timur',
  'Lampung Utara',
  'Mesuji, Lampung',
  'Pesawaran, Lampung',
  'Pesisir Barat, Lampung',
  'Pringsewu, Lampung',
  'Tanggamus, Lampung',
  'Tulang Bawang, Lampung',
  'Tulang Bawang Barat, Lampung',
  'Way Kanan, Lampung',
  'Bandar Lampung, Lampung',
  'Metro, Lampung',
  'Banten',
  'Lebak, Banten',
  'Pandeglang, Banten',
  'Serang, Banten',
  'Tangerang, Banten',
  'Cilegon, Banten',
  'Serang, Banten',
  'Kota Tangerang, Banten',
  'Kota Tangerang Selatan, Banten',
  'Jawa Barat',
  'Bandung, Jawa Barat',
  'Bandung Barat, Jawa Barat',
  'Bekasi, Jawa Barat',
  'Bogor, Jawa Barat',
  'Ciamis, Jawa Barat',
  'Cianjur, Jawa Barat',
  'Cirebon, Jawa Barat',
  'Garut, Jawa Barat',
  'Indramayu, Jawa Barat',
  'Karawang, Jawa Barat',
  'Kuningan, Jawa Barat',
  'Majalengka, Jawa Barat',
  'Pangandaran, Jawa Barat',
  'Purwakarta, Jawa Barat',
  'Subang, Jawa Barat',
  'Sukabumi, Jawa Barat',
  'Sumedang, Jawa Barat',
  'Tasikmalaya, Jawa Barat',
  'Kota Bandung, Jawa Barat',
  'Banjar, Jawa Barat',
  'Kota Bekasi, Jawa Barat',
  'Kota Bogor, Jawa Barat',
  'Cimahi, Jawa Barat',
  'Kota Cirebon, Jawa Barat',
  'Depok, Jawa Barat',
  'Sukabumi, Jawa Barat',
  'Kota Tasikmalaya, Jawa Barat',
  'DKI Jakarta',
  'Jakarta Barat, DKI Jakarta',
  'Jakarta Pusat, DKI Jakarta',
  'Jakarta Selatan, DKI Jakarta',
  'Jakarta Timur, DKI Jakarta',
  'Jakarta Utara, DKI Jakarta',
  'Jawa Tengah',
  'Banjarnegara, Jawa Tengah',
  'Banyumas, Jawa Tengah',
  'Batang, Jawa Tengah',
  'Blora, Jawa Tengah',
  'Boyolali, Jawa Tengah',
  'Brebes, Jawa Tengah',
  'Cilacap, Jawa Tengah',
  'Demak, Jawa Tengah',
  'Grobogan, Jawa Tengah',
  'Jepara, Jawa Tengah',
  'Karanganyar, Jawa Tengah',
  'Kebumen, Jawa Tengah',
  'Kendal, Jawa Tengah',
  'Klaten, Jawa Tengah',
  'Kudus, Jawa Tengah',
  'Magelang, Jawa Tengah',
  'Pati, Jawa Tengah',
  'Pekalongan, Jawa Tengah',
  'Pemalang, Jawa Tengah',
  'Purbalingga, Jawa Tengah',
  'Purworejo, Jawa Tengah',
  'Rembang, Jawa Tengah',
  'Semarang, Jawa Tengah',
  'Sragen, Jawa Tengah',
  'Sukoharjo, Jawa Tengah',
  'Tegal, Jawa Tengah',
  'Temanggung, Jawa Tengah',
  'Wonogiri, Jawa Tengah',
  'Wonosobo, Jawa Tengah',
  'Kota Magelang, Jawa Tengah',
  'Kota Pekalongan, Jawa Tengah',
  'Salatiga, Jawa Tengah',
  'Kota Semarang, Jawa Tengah',
  'Surakarta, Jawa Tengah',
  'Kota Tegal, Jawa Tengah',
  'Daerah Istimewa Yogyakarta',
  'Bantul, DIY',
  'Gunungkidul, DIY',
  'Kulon Progo, DIY',
  'Sleman, DIY',
  'Yogyakarta, DIY',
  'Jawa Timur',
  'Bangkalan, Jawa Timur',
  'Banyuwangi, Jawa Timur',
  'Blitar, Jawa Timur',
  'Bojonegoro, Jawa Timur',
  'Bondowoso, Jawa Timur',
  'Gresik, Jawa Timur',
  'Jember, Jawa Timur',
  'Jombang, Jawa Timur',
  'Kediri, Jawa Timur',
  'Lamongan, Jawa Timur',
  'Lumajang, Jawa Timur',
  'Madiun, Jawa Timur',
  'Magetan, Jawa Timur',
  'Malang, Jawa Timur',
  'Mojokerto, Jawa Timur',
  'Nganjuk, Jawa Timur',
  'Ngawi, Jawa Timur',
  'Pacitan, Jawa Timur',
  'Pamekasan, Jawa Timur',
  'Pasuruan, Jawa Timur',
  'Ponorogo, Jawa Timur',
  'Probolinggo, Jawa Timur',
  'Sampang, Jawa Timur',
  'Sidoarjo, Jawa Timur',
  'Situbondo, Jawa Timur',
  'Sumenep, Jawa Timur',
  'Trenggalek, Jawa Timur',
  'Tuban, Jawa Timur',
  'Tulungagung, Jawa Timur',
  'Batu, Jawa Timur',
  'Kota Blitar, Jawa Timur',
  'Kota Kediri, Jawa Timur',
  'Kota Madiun, Jawa Timur',
  'Kota Malang, Jawa Timur',
  'Kota Mojokerto, Jawa Timur',
  'Kota Pasuruan, Jawa Timur',
  'Kota Probolinggo, Jawa Timur',
  'Surabaya, Jawa Timur',
  'Bali',
  'Badung, Bali',
  'Bangli, Bali',
  'Buleleng, Bali',
  'Gianyar, Bali',
  'Jembrana, Bali',
  'Karangasem, Bali',
  'Klungkung, Bali',
  'Tabanan, Bali',
  'Denpasar, Bali',
  'Nusa Tenggara Barat',
  'Bima, Nusa Tenggara Barat',
  'Dompu, Nusa Tenggara Barat',
  'Lombok Barat, Nusa Tenggara Barat',
  'Lombok Tengah, Nusa Tenggara Barat',
  'Lombook Timur, Nusa Tenggara Barat',
  'Lombok Utara, Nusa Tenggara Barat',
  'Sumbawa, Nusa Tenggara Barat',
  'Sumbawa Barat, Nusa Tenggara Barat',
  'Kota Bima, Nusa Tenggara Barat',
  'Mataram, Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Alon, Nusa Tenggara Timur',
  'Belu, Nusa Tenggara Timur',
  'Ende, Nusa Tenggara Timur',
  'Flores timur, Nusa Tenggara Timur',
  'Kupang, Nusa Tenggara Timur',
  'Lembata, Nusa Tenggara Timur',
  'Malaka, Nusa Tenggara Timur',
  'Manggara, Nusa Tenggara Timur',
  'Manggarai Barat, Nusa Tenggara Timur',
  'Manggarai Timur, Nusa Tenggara Timur',
  'Nagekeo, Nusa Tenggara Timur',
  'Ngada, Nusa Tenggara Timur',
  'Rote Ndao, Nusa Tenggara Timur',
  'Sabu Raijua, Nusa Tenggara Timur',
  'Sikka, Nusa Tenggara Timur',
  'Sumba Barat, Nusa Tenggara Timur',
  'Sumba Barat Daya, Nusa Tenggara Timur',
  'Sumba Tengah, Nusa Tenggara Timur',
  'Sumba Timur, Nusa Tenggara Timur',
  'Timor Tenga Selatan, Nusa Tenggara Timur',
  'Timor Tengah Utara, Nusa Tenggara Timur',
  'Kota Kupang, Nusa Tenggara Timur',
  'Kalimantan Barat',
  'Bengkayang, Kalimantan Barat',
  'Kapuas Hulu, Kalimantan Barat',
  'Kayong Utara, Kalimantan Barat',
  'Ketapang, Kalimantan Barat',
  'Kubu Raya, Kalimantan Barat',
  'Landak, Kalimantan Barat',
  'Melawi, Kalimantan Barat',
  'Mempawah, Kalimantan Barat',
  'Sambas, Kalimantan Barat',
  'Sanggau, Kalimantan Barat',
  'Sekadau, Kalimantan Barat',
  'Sintang, Kalimantan Barat',
  'Pontianak, Kalimantan Barat',
  'Singkawang, Kalimantan Barat',
  'Kalimantan Selatan',
  'Balangan, Kalimantan Selatan',
  'Banjar, Kalimantan Selatan',
  'Barto Kuala, Kalimantan Selatan',
  'Hulu Sungai Selatan, Kalimantan Selatan',
  'Hulu Sungai Tengah, Kalimantan Selatan',
  'Hulu Sungai Utara, Kalimantan Selatan',
  'Kotabaru, Kalimantan Selatan',
  'Tabalong, Kalimantan Selatan',
  'Tanah Bumbu, Kalimantan Selatan',
  'Tanah Laut, Kalimantan Selatan',
  'Tapin, Kalimantan Selatan',
  'Banjarbaru, Kalimantan Selatan',
  'Banjarmasin, Kalimantan Selatan',
  'Kalimantan Tengah',
  'Barito Selatan, Kalimantan Tengah',
  'Barito Timur, Kalimantan Tengah',
  'Barito Utara, Kalimantan Tengah',
  'Gunung Mas, Kalimantan Tengah',
  'Kapuas, Kalimantan Tengah',
  'Katingan, Kalimantan Tengah',
  'Kotawaringin Barat, Kalimantan Tengah',
  'Kotawaringin Timur, Kalimantan Tengah',
  'Lamandau, Kalimantan Tengah',
  'Murung Raya, Kalimantan Tengah',
  'Pulang Pisau, Kalimantan Tengah',
  'Sukamara, Kalimantan Tengah',
  'Seruyan, Kalimantan Tengah',
  'Palangka Raya, Kalimantan Tengah',
  'Kalimantan Timur',
  'Berau, Kalimantan Timur',
  'Kutai Barat, Kalimantan Timur',
  'Kutai Kartanegara, Kalimantan Timur',
  'Kutai Timur, Kalimantan Timur',
  'Mahakam Ulu, Kalimantan Timur',
  'Paser, Kalimantan Timur',
  'Penajam Paser Utara, Kalimantan Timur',
  'Balikpapan, Kalimantan Timur',
  'Bontang, Kalimantan Timur',
  'Samarinda, Kalimantan Timur',
  'Kalimantan Utara',
  'Bulungan, Kalimantan Utara',
  'Malinau, Kalimantan Utara',
  'Nunukan, Kalimantan Utara',
  'Tana Tidung, Kalimantan Utara',
  'Tarakan, Kalimantan Utara',
  'Gorontalo',
  'Bolaemo, Gorontalo',
  'Bone Bolango, Gorontalo',
  'Gorontalo, Gorontalo',
  'Gorontalo Utara, Gorontalo',
  'Pohuwato, Gorontalo',
  'Kota Gorontalo, Gorontalo',
  'Sulawesi Barat',
  'Majene, Sulawesi Barat',
  'Mamasa, Sulawesi Barat',
  'Mamuju, Sulawesi Barat',
  'Mamuju Tengah, Sulawesi Barat',
  'Pasangkayu, Sulawesi Barat',
  'Polewali Mandar, Sulawesi Barat',
  'Sulawesi Selatan',
  'Bantaeng, Sulawesi Selatan',
  'Barru, Sulawesi Selatan',
  'Bone, Sulawesi Selatan',
  'Bolukumba, Sulawesi Selatan',
  'Enrekang, Sulawesi Selatan',
  'Gowa, Sulawesi Selatan',
  'Jeneponto, Sulawesi Selatan',
  'Kepulauan Selayar, Sulawesi Selatan',
  'Luwu, Sulawesi Selatan',
  'Luwu Timur, Sulawesi Selatan',
  'Luwu Utara, Sulawesi Selatan',
  'Maros, Sulawesi Selatan',
  'Pangkajene, Sulawesi Selatan',
  'Pinrang, Sulawesi Selatan',
  'Sidenreng Rappang, Sulawesi Selatan',
  'Sinjai, Sulawesi Selatan',
  'Soppeng, Sulawesi Selatan',
  'Takalar, Sulawesi Selatan',
  'Tana Toraja, Sulawesi Selatan',
  'Wajo, Sulawesi Selatan',
  'Makassar, Sulawesi Selatan',
  'Palopo, Sulawesi Selatan',
  'Parepare Sulawesi Selatan',
  'Sulawesi Tenggara',
  'Bombana, Sulawesi Tenggara',
  'Buton, Sulawesi Tenggara',
  'Buton Selatan, Sulawesi Tenggara',
  'Buton Tengah, Sulawesi Tenggara',
  'Buton Utara, Sulawesi Tenggara',
  'Kolaka, Sulawesi Tenggara',
  'Kolaka Timur, Sulawesi Tenggara',
  'Kolaka Utara, Sulawesi Tenggara',
  'Konawe, Sulawesi Tenggara',
  'Konawe Kepulauan, Sulawesi Tenggara',
  'Konawe Selatan, Sulawesi Tenggara',
  'Konawe Utara, Sulawesi Tenggara',
  'Muna, Sulawesi Tenggara',
  'Muna Barat, Sulawesi Tenggara',
  'Wakatobi, Sulawesi Tenggara',
  'Baubau, Sulawesi Tenggara',
  'Kendari, Sulawesi Tenggara',
  'Sulawesi Tengah',
  'Banggai, Sulawesi Tengah',
  'Banggai Kepulauan, Sulawesi Tengah',
  'Banggai Laut, Sulawesi Tengah',
  'Buol, Sulawesi Tengah',
  'Donggala, Sulawesi Tengah',
  'Morowali, Sulawesi Tengah',
  'Morowali Utara, Sulawesi Tengah',
  'Parigi Moutong, Sulawesi Tengah',
  'Poso, Sulawesi Tengah',
  'Sigi, Sulawesi Tengah',
  'Tojo Una-Una, Sulawesi Tengah',
  'Tolitoli, Sulawesi Tengah',
  'Palu, Sulawesi Tengah',
  'Sulawesi Utara',
  'Bolaang Mongondow, Sulawesi Utara',
  'Bolaang Mongondow Selatan, Sulawesi Utara',
  'Bolaang Mongondow Timur, Sulawesi Utara',
  'Bolaang Mongondow Utara, Sulawesi Utara',
  'Kepulauan Sangihe, Sulawesi Utara',
  'Kepulauan Siau Tagulandang Biaro, Sulawesi Utara',
  'Kepulauan Talaud, Sulawesi Utara',
  'Minahasa, Sulawesi Utara',
  'Minahasa Selatan, Sulawesi Utara',
  'Minahasa Tenggara, Sulawesi Utara',
  'Minahasa Utara, Sulawesi Utara',
  'Bitung, Sulawesi Utara',
  'Kotamobagu, Sulawesi Utara',
  'Manado, Sulawesi Utara',
  'Tomohon, Sulawesi Utara',
  'Maluku',
  'Buru, Maluku',
  'Buru Selatan, Maluku',
  'Kepulauan Aru, Maluku',
  'Kepulauan Tanimbar, Maluku',
  'Maluku Barat Daya, Maluku',
  'Maluku Tengah, Maluku',
  'Maluku Tenggara, Maluku',
  'Seram Bagian Barat, Maluku',
  'Seram Bagian Timur, Maluku',
  'Ambon, Maluku',
  'Tual, Maluku',
  'Maluku Utara',
  'Halmahera Barat, Maluku Utara',
  'Halmahera Tengah, Maluku Utara',
  'Halmahera Timur, Maluku Utara',
  'Halmahera Selatan, Maluku Utara',
  'Halmahera Utara, Maluku Utara',
  'Kepulauan Sula, Maluku Utara',
  'Pulau Morotai, Maluku Utara',
  'Pulau Tailabu, Maluku Utara',
  'Ternate, Maluku Utara',
  'Tidore Kepulauan, Maluku Utara',
  'Papua',
  'Asmat, Papua',
  'Biak Numfor, Papua',
  'Boven Digoel, Papua',
  'Deiyai, Papua',
  'Dogiyai, Papua',
  'Intan Jaya, Papua',
  'Jayapura, Papua',
  'Jayawijaya, Papua',
  'Keerom, Papua',
  'Kepulauan Yapen, Papua',
  'Lanny Jaya, Papua',
  'Mamberamo Raya, Papua',
  'Mappi, Papua',
  'Merauke, Papua',
  'Mimika, Papua',
  'Nabire, Papua',
  'Nduga, Papua',
  'Paniai, Papua',
  'Pegunungan Bintang, Papua',
  'Puncak, Papua',
  'Puncak Jaya, Papua',
  'Sarmi, Papua',
  'Supiori, Papua',
  'Tolikara, Papua',
  'Waropen, Papua',
  'Yahukimo, Papua',
  'Yalimo, Papua',
  'Kota Jayapura, Papua',
  'Papua Barat',
  'Fakfak, Papua Barat',
  'Kaimana, Papua Barat',
  'Manokwari, Papua Barat',
  'Manokwari Selatan, Papua Barat',
  'Maybrat, Papua Barat',
  'Pegunungan Arfak, Papua Barat',
  'Raja Ampat, Papua Barat',
  'Sorong, Papua Barat',
  'Sorong Selatan, Papua Barat',
  'Tambrauw, Papua Barat',
  'Teluk Bintuni, Papua Barat',
  'Teluk Wondama, Papua Barat',
  'Kota Sorong, Papua Barat',
]);
const filteredCities = ref([]);

const autoCompleteHandler = (e) => {
  const userData = e.target.value;
  if (userData) {
    filteredCities.value = cities.value.filter((city) => city.toLowerCase().startsWith(userData.toLowerCase()));
    autoCompleteListVisible.value = true;
  } else {
    autoCompleteListVisible.value = false;
  }
};

const useAutocomplete = (e) => {
  const choosenCity = e.target.innerText.trim();
  cityInput.value.value = choosenCity;
  autoCompleteListVisible.value = false;
};
</script>

<template>
  <main>
    <section class="relative h-[40vh] text-white">
      <img
        src="../../assets/images/hero.jpg"
        alt=""
        class="h-full w-full object-cover"
        draggable="false"
      />
      <div class="absolute top-0 left-0 h-full w-full bg-darkFilter"></div>
      <div
        class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-4"
      >
        <h2 class="font-montserrat text-4xl font-bold">Get your bestie</h2>
        <form class="text-black w-[75vw] flex gap-3" @submit.prevent="">
          <div class="relative w-full">
            <input
              type="search"
              class="py-2 pl-10 pr-3 w-full text-sm rounded focus:outline-0"
              placeholder="Masukkan jenis peliharaan"
            />
            <span
              class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"
              ><font-awesome-icon icon="magnifying-glass"
            /></span>
          </div>
          <div class="relative w-full">
            <input
              type="search"
              class="py-2 pl-10 pr-3 w-full text-sm rounded focus:outline-0"
              placeholder="Masukkan kota"
              ref="cityInput"
              @keyup="autoCompleteHandler"
            />
            <span
              class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"
              ><font-awesome-icon icon="location-dot"
            /></span>
            <AutoCompleteList
              :cities="filteredCities"
              :clickHandler="useAutocomplete"
              v-show="autoCompleteListVisible"
              ref="autoCompleteList"
            />
          </div>
          <button
            class="bg-primary text-white text-sm font-semibold w-1/5 rounded"
          >
            Cari
          </button>
        </form>
      </div>
    </section>
    <section class="pt-6 px-10">
      <h3 class="font-semibold text-lg text-darkGray mb-4">
        Peliharaan Berdasarkan Kategori
      </h3>
      <div class="grid grid-cols-4 gap-5">
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6">
            <img
              src="../../assets/images/cat.jpg"
              alt="kucing silver"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Kucing
          </h4>
        </a>
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6">
            <img
              src="../../assets/images/dog.jpg"
              alt="anjing duduk di lantai"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Anjing
          </h4>
        </a>
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6">
            <img
              src="../../assets/images/bird.jpg"
              alt="lovebird di ranting pohon"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Burung
          </h4>
        </a>
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6 flex justify-center items-center">
            <img
              src="../../assets/icons/paw-gray.svg"
              alt="ikon paw"
              class="w-2/3 h-2/3"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Lainnya
          </h4>
        </a>
      </div>
    </section>
    <section class="pt-10 px-10">
      <h3 class="font-semibold text-lg text-darkGray mb-4">
        Yang Mungkin Anda Suka
      </h3>
      <div class="grid grid-cols-6 gap-5">
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-3/6">
            <img
              src="../../assets/images/cat.jpg"
              alt="kucing silver"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <div class="py-3 px-4 h-3/6">
            <h4 class="font-semibold truncate">
              <font-awesome-icon icon="mars" class="text-darkGray text-2xl" />
              Ardi
            </h4>
            <p class="text-sm">Kucing Persia</p>
            <p class="text-sm font-medium text-darkGray">2 tahun</p>
            <p class="text-sm mt-3">
              <font-awesome-icon
                icon="location-dot"
                class="text-primary mr-1"
              />
              Jakarta
            </p>
          </div>
        </a>
      </div>
    </section>
    <section class="pt-10 px-10">
      <h3 class="font-semibold text-lg text-darkGray mb-4">Artikel Terbaru</h3>
      <div class="grid grid-cols-3 gap-5">
        <div class="h-[450px] rounded-lg shadow-andopt">
          <div class="h-3/6">
            <img
              src="../../assets/images/cat.jpg"
              alt="kucing silver"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <div class="py-3 px-4 h-3/6">
            <h4 class="font-semibold truncate">Cara Merawat Kucing Anggora</h4>
            <p class="text-sm font-medium text-darkGray">Pet Care</p>
            <p class="text-sm text-ellipsis overflow-hidden mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
              accusamus porro dolore deserunt omnis quas cupiditate, vel libero
              in saepe praesentium similique quidem tenetur labore recusandae
              expedita, amet ratione. Numquam.
            </p>
            <a href="#" class="text-sm text-primary mt-4 inline-block"
              >Baca Selengkapnya</a
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
