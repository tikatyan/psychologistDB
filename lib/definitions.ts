export interface TermDef {
  fullName?: string
  definition: string
}

export const FOCUS_DEFINITIONS: Record<string, TermDef> = {
  'Kecemasan': { definition: 'Rasa khawatir atau takut yang berlebihan dan susah dimatikan. Bisa muncul sebagai panic attacks, ketegangan terus-menerus, atau ketakutan spesifik yang ganggu aktivitas.' },
  'Depresi': { definition: 'Lebih dari sekadar sedih. Bisa terasa seperti kekosongan, kehilangan semangat untuk hal-hal yang biasanya kamu suka, atau susah bangun di pagi hari.' },
  'Trauma': { definition: 'Pengalaman berat yang masih "nempel" sampai sekarang — bisa dari masa kecil, hubungan yang menyakitkan, atau kejadian tertentu yang belum selesai diproses.' },
  'OCD': { fullName: 'Obsessive-Compulsive Disorder', definition: 'Pikiran yang berulang-ulang dan susah dihentikan (obsesi), atau dorongan untuk melakukan ritual tertentu supaya cemas mereda (kompulsi).' },
  'BPD': { fullName: 'Borderline Personality Disorder', definition: 'Emosi yang intens dan cepat berubah, hubungan yang naik-turun drastis, dan rasa takut ditinggal yang dalam.' },
  'Relasi Romantis': { definition: 'Masalah di hubungan — komunikasi yang tidak nyambung, kepercayaan yang bolong, ketergantungan emosional, atau proses move on setelah putus.' },
  'Burnout': { definition: 'Kelelahan total — fisik, emosi, dan mental — yang datang dari tekanan atau tanggung jawab yang terlalu berat dalam waktu terlalu lama.' },
  'Psikologi Anak': { definition: 'Tantangan pada anak: keterlambatan perkembangan, perilaku yang bikin pusing, masalah emosi, atau kesulitan belajar.' },
  'Remaja': { definition: 'Tekanan di masa remaja — mencari identitas, tekanan sosial, akademik, konflik keluarga, atau navigating life changes yang datang bersamaan.' },
  'Keluarga': { definition: 'Dinamika keluarga: konflik orang tua dan anak, batas-batas yang belum jelas, pola hubungan yang sudah lama tidak sehat.' },
  'Pernikahan': { definition: 'Masalah dalam pernikahan: komunikasi yang terasa jauh, kepercayaan yang retak, konflik yang berulang, atau sedang mempertimbangkan jalan ke depan.' },
  'Karier': { definition: 'Stres kerja, konflik di kantor, merasa stuck atau tidak puas, atau sedang dalam transisi karier yang penuh ketidakpastian.' },
  'Regulasi Emosi': { definition: 'Kesulitan mengelola emosi — sering meledak, mudah overwhelmed, atau justru sebaliknya: mati rasa dan sulit merasakan apapun.' },
  'Stres': { definition: 'Tekanan yang terasa terlalu berat — dari kerja, keluarga, finansial, atau kombinasi semuanya sekaligus.' },
  'PTSD': { fullName: 'Post-Traumatic Stress Disorder', definition: 'Trauma yang kembali muncul sebagai flashback, mimpi buruk, atau respons ketakutan yang tidak proporsional dengan situasi.' },
  'Pengembangan Diri': { definition: 'Mengenal diri lebih dalam, membangun kepercayaan diri, atau tumbuh jadi versi kamu yang lebih baik.' },
  'Parenting': { definition: 'Tantangan mengasuh anak — komunikasi, disiplin, batasan, atau menjadi orang tua yang lebih sadar dan hadir.' },
  'SAD': { fullName: 'Social Anxiety Disorder', definition: 'Rasa takut dihakimi atau dipermalukan dalam situasi sosial, sampai akhirnya menghindari interaksi sama sekali.' },
  'BDD': { fullName: 'Body Dysmorphic Disorder', definition: 'Fokus berlebihan pada kekurangan penampilan yang mungkin tidak tampak bagi orang lain.' },
  'Gangguan Kecemasan': { definition: 'Kecemasan yang sudah cukup intens dan menetap sampai mengganggu kehidupan sehari-hari.' },
  'Hubungan Interpersonal': { definition: 'Kesulitan membangun atau mempertahankan hubungan yang sehat — dengan teman, keluarga, atau rekan kerja.' },
  'MDD': { fullName: 'Major Depressive Disorder', definition: 'Depresi klinis yang lebih dari sekadar sedih biasa — berlangsung berminggu-minggu dan mengganggu fungsi sehari-hari.' },
  'Gangguan Kepribadian': { definition: 'Pola pikir, perasaan, dan perilaku yang menetap dan bikin hidup terasa sulit — untuk diri sendiri maupun orang sekitar.' },
  'Panic Disorder': { definition: 'Serangan panik yang muncul tiba-tiba dan intens, disertai ketakutan bahwa itu akan terjadi lagi.' },
  'Konseling Klinis': { definition: 'Layanan konseling profesional untuk berbagai masalah psikologis, dari yang ringan sampai klinis.' },
}

export const APPROACH_DEFINITIONS: Record<string, TermDef> = {
  'CBT': { fullName: 'Cognitive Behavioral Therapy', definition: 'Bantu kamu kenali dan ubah pola pikir yang bikin stuck, lalu ganti dengan cara merespons yang lebih sehat.' },
  'ACT': { fullName: 'Acceptance and Commitment Therapy', definition: 'Belajar menerima perasaan sulit tanpa harus melawan atau melarikan diri, supaya kamu bisa tetap gerak sesuai nilai hidup kamu.' },
  'REBT': { fullName: 'Rational Emotive Behavior Therapy', definition: 'Identifikasi keyakinan irasional yang bikin kamu tertekan, lalu ganti dengan perspektif yang lebih realistis.' },
  'NLP': { fullName: 'Neuro-Linguistic Programming', definition: 'Menggunakan pola bahasa dan pikiran untuk mengubah perilaku dan respons emosional.' },
  'EFT': { fullName: 'Emotionally Focused Therapy', definition: 'Membantu memahami dan mengubah pola emosional yang bikin hubungan terasa jauh.' },
  'Evidence-Based': { definition: 'Menggunakan teknik-teknik yang sudah terbukti efektif secara ilmiah — bukan coba-coba.' },
  'NICE Guidelines': { definition: 'Mengikuti panduan klinis NICE (UK) yang berbasis riset untuk kondisi kesehatan mental tertentu.' },
  'Hipnoterapi': { definition: 'Menggunakan relaksasi dalam untuk mengakses dan mengubah pola pikir di bawah sadar.' },
  'Play Therapy': { definition: 'Terapi lewat bermain — terutama untuk anak-anak yang lebih mudah mengekspresikan diri lewat permainan daripada kata-kata.' },
  'Client Centered Therapy': { definition: 'Psikolog hadir sebagai teman yang mendengarkan, tanpa menghakimi. Kamu yang menentukan arahnya.' },
  'Logo Therapy': { definition: 'Terapi berbasis makna hidup — mencari tujuan di balik penderitaan. Dikembangkan Viktor Frankl dari pengalamannya bertahan di kamp konsentrasi.' },
  'Solution-Focused Behavior Therapy': { definition: 'Fokus ke solusi dan kekuatan yang sudah kamu punya — bukan menggali-gali masalah dari masa lalu.' },
  'Mindfulness': { definition: 'Belajar hadir penuh di momen ini. Bukan overthinking masa lalu atau mengkhawatirkan masa depan.' },
  'Mental Coaching': { definition: 'Pendekatan coaching untuk mencapai tujuan dan performa mental yang lebih optimal.' },
  'Gottman Method': { definition: 'Metode berbasis riset untuk memperbaiki komunikasi dan koneksi dalam hubungan pasangan.' },
  'Psychological First Aid': { definition: 'Pendekatan pertolongan pertama untuk membantu seseorang yang baru mengalami krisis atau trauma.' },
  'Positive Psychotherapy': { definition: 'Fokus pada kekuatan, makna, dan hal-hal positif dalam hidup kamu — bukan hanya pada masalah.' },
  'Reconnect Compassion Therapy': { definition: 'Terapi yang berfokus pada membangun kembali koneksi dengan diri sendiri melalui rasa kasih sayang (self-compassion).' },
  'Grafologi': { definition: 'Analisis tulisan tangan sebagai salah satu alat untuk memahami kepribadian.' },
}
