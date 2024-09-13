import { Text, View, Font } from "@react-pdf/renderer";
import halEmpat from "./halEmpatStyle";
import Poppins from "../../assets/font/Poppins Regular 400.ttf";
import Poppins600 from "../../assets/font/Poppins SemiBold 600.ttf";
import Poppins500 from "../../assets/font/Poppins Medium 500.ttf";

Font.register({ family: "Poppins", src: Poppins });
Font.register({ family: "Poppins600", src: Poppins600 });
Font.register({ family: "Poppins500", src: Poppins500 });

const HalEmpatRPS = () => (
  <View style={halEmpat.content_rps}>
    <View>
      <View style={halEmpat.title_section_flex}>
        <View>
          <View style={halEmpat.no}>
            <View style={halEmpat.title_section}>
              <Text style={[halEmpat.title_text, halEmpat.title_t_satu]}>
                Minggu Ke-
              </Text>
              <Text style={[halEmpat.title_text, halEmpat.title_t_dua]}>
                Sub-CPMK (Kemampuan akhir yg direncanakan)
              </Text>
              <Text style={[halEmpat.title_text, halEmpat.title_t_tiga]}>
                Bahan Kajian (Materi Pembelajaran)
              </Text>
              <View style={[halEmpat.title_text, halEmpat.title_t_empat]}>
                <Text>Bentuk dan Metode Pembelajaran</Text>
                <Text style={halEmpat.text_blue_color}>
                  [Media & Sumber Belajar]
                </Text>
              </View>
              <Text style={[halEmpat.title_text, halEmpat.title_t_lima]}>
                Estimasi Waktu
              </Text>
              <Text style={[halEmpat.title_text, halEmpat.title_t_enam]}>
                Pengalaman Belajar Mahasiswa
              </Text>
            </View>

            <View style={halEmpat.no_section}>
              <Text style={[halEmpat.title_no, halEmpat.no_satu]}>(1)</Text>
              <Text style={[halEmpat.title_no, halEmpat.no_dua]}>(2)</Text>
              <Text style={[halEmpat.title_no, halEmpat.no_tiga]}>(3)</Text>
              <Text style={[halEmpat.title_no, halEmpat.no_empat]}>(4)</Text>
              <Text style={[halEmpat.title_no, halEmpat.no_lima]}>(5)</Text>
              <Text style={[halEmpat.title_no, halEmpat.no_enam]}>(6)</Text>
            </View>
          </View>

          <View style={halEmpat.content_section_flex}>
            <View style={halEmpat.content_section_minggu}>
              <View style={[halEmpat.content_text]}>
                <Text>I</Text>
              </View>
              <View style={[halEmpat.content_text]}>
                <Text>II</Text>
              </View>
              <View style={[halEmpat.content_text]}>
                <Text>III</Text>
              </View>
              <View style={[halEmpat.content_text]}>
                <Text>IV</Text>
              </View>
              <View style={[halEmpat.content_text]}>
                <Text>V</Text>
              </View>
              <View style={[halEmpat.content_text]}>
                <Text>VI</Text>
              </View>
              <View style={[halEmpat.content_text]}>
                <Text>VII</Text>
              </View>
            </View>

            <View>
              <View style={halEmpat.isi_section_sub_cpmk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut dignissimos incidunt veniam totam debitis delectus enim doloribus, ad dolorum repellendus?</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_sub_cpmk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_sub_cpmk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_sub_cpmk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_sub_cpmk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_sub_cpmk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={[halEmpat.isi_section_sub_cpmk, halEmpat.ujian]}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bahan}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_bentuk}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_estimasi}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
              <View style={halEmpat.isi_section_pengalaman}>
                <View style={halEmpat.isi_section_text}>
                  <Text>test</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={halEmpat.text_penilaian_center}>
            <View style={halEmpat.title_text_penilaian}>
              <Text>Penilaian</Text>
            </View>

            <View>
              <View style={halEmpat.penilaian}>
                <Text style={[halEmpat.text_penilaian, halEmpat.kriteria]}>
                  Kriteria & Bentuk
                </Text>
                <Text style={[halEmpat.text_penilaian, halEmpat.indikator]}>
                  Indikator
                </Text>
                <View style={[halEmpat.text_penilaian, halEmpat.bobot]}>
                  <Text>Bobot</Text>
                  <Text>(%)</Text>
                </View>
              </View>

              <View style={halEmpat.no_section}>
                <Text style={[halEmpat.title_no, halEmpat.no_penilaian_satu]}>
                  (7)
                </Text>
                <Text style={[halEmpat.title_no, halEmpat.no_penilaian_dua]}>
                  (8)
                </Text>
                <Text style={[halEmpat.title_no, halEmpat.no_penilaian_tiga]}>
                  (9)
                </Text>
              </View>
            </View>

            <View style={halEmpat.content_penilaian_flex}>
              <View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_kriteria}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_indikator}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
                <View style={halEmpat.isi_penilaian_bobot}>
                  <View>
                    <Text>test</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={halEmpat.content_minggu_delapan}>
        <View style={halEmpat.content_section_minggu}>
          <View style={[halEmpat.content_text]}>
            <Text>VII</Text>
          </View>
        </View>

        <View>
          <View style={[halEmpat.minggu_delapan, halEmpat.bg_ujian]}>
            <View style={[halEmpat.isi_section_text]}>
              <Text>Ujian Tengah Semester</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={halEmpat.content_section_flex}>
        <View style={halEmpat.content_section_minggu}>
          <View style={[halEmpat.content_text]}>
            <Text>IX</Text>
          </View>
          <View style={[halEmpat.content_text]}>
            <Text>X</Text>
          </View>
          <View style={[halEmpat.content_text]}>
            <Text>XI</Text>
          </View>
          <View style={[halEmpat.content_text]}>
            <Text>XII</Text>
          </View>
          <View style={[halEmpat.content_text]}>
            <Text>XIII</Text>
          </View>
          <View style={[halEmpat.content_text]}>
            <Text>XIV</Text>
          </View>
          <View style={[halEmpat.content_text]}>
            <Text>XV</Text>
          </View>
        </View>

        <View>
          <View style={halEmpat.isi_section_sub_cpmk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_sub_cpmk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_sub_cpmk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_sub_cpmk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_sub_cpmk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_sub_cpmk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={[halEmpat.isi_section_sub_cpmk, halEmpat.ujian]}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bahan}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_bentuk}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_estimasi}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
          <View style={halEmpat.isi_section_pengalaman}>
            <View style={halEmpat.isi_section_text}>
              <Text>test</Text>
            </View>
          </View>
        </View>

        <View style={halEmpat.content_penilaian_flex}>
          <View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_kriteria}>
              <View>
                <Text>test</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_indikator}>
              <View>
                <Text>test</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
            <View style={halEmpat.isi_penilaian_bobot}>
              <View>
                <Text>test</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={halEmpat.content_minggu_delapan}>
        <View style={halEmpat.content_section_minggu}>
          <View style={[halEmpat.content_text]}>
            <Text>XIV</Text>
          </View>
        </View>

        <View>
          <View style={[halEmpat.minggu_delapan, halEmpat.bg_ujian]}>
            <View style={[halEmpat.isi_section_text]}>
              <Text>Ujian Akhir Semester</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default HalEmpatRPS;
