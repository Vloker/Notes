import React, { useState, useEffect } from "react";
import Inputan from "../inputan/Inputan";
import Button from "../button/Button";
import Catatan from "../card/Catatan";
import Arsip from "../card/Arsip";
import Header from "../header/Header";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getInitialData, showFormattedDate } from "../../utils";

const validationSchema = Yup.object().shape({
  judul: Yup.string().required('Judul wajib diisi!'),
  deskripsi: Yup.string().required('Deskripsi wajib diisi!'),
})

function Form() {

  const [arsipData, setArsipData] = useState([]);
  const [catatanData, setCatatanData] = useState([]);
  const [filteredCatatanData, setFilteredCatatanData] = useState([]);
  const [filteredArsipData, setFilteredArsipData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [noDataMessage, setNoDataMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      judul: "",
      deskripsi: ""
    },
    onSubmit: (values) => {
      handleClick(values);
    },
    validationSchema: validationSchema
  });

  const handleInputChange = (event) => {
    formik.handleChange(event);
  };

const handleClick = (values) => {
  const newCatatan = {
    id: Date.now(),
    title: values.judul,
    createdAt: new Date().toLocaleDateString(),
    body: values.deskripsi
  };
  setCatatanData([...catatanData, newCatatan]);
  formik.resetForm();
}

const handleArsip = (id) => {
  const itemToMove = catatanData.find(item => item.id === id);
  if (itemToMove) {
    setArsipData([...arsipData, itemToMove]);
    setCatatanData(catatanData.filter(item => item.id !== id));
  }
}

const handlePindahkan = (id) => {
  const itemToMove = arsipData.find(item => item.id === id);
  if (itemToMove) {
    setCatatanData([...catatanData, itemToMove]);
    setArsipData(arsipData.filter(item => item.id !== id));
  }
}

const handleDelete = (id) => {
  setCatatanData(catatanData.filter(item => item.id !== id));
  setArsipData(arsipData.filter(item => item.id !== id));
}

useEffect(() => {
  if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
    // Menyaring data catatan berdasarkan pencarian
    const filteredCatatanData = catatanData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Menyaring data arsip berdasarkan pencarian
    const filteredArsipData = arsipData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mengupdate data catatan dan arsip yang telah disaring
    setFilteredCatatanData(filteredCatatanData);
    setFilteredArsipData(filteredArsipData);

    // Setel pesan "Data tidak ditemukan" jika tidak ada judul yang ditemukan
    if (filteredCatatanData.length === 0 && filteredArsipData.length === 0) {
      setNoDataMessage('Data tidak ditemukan');
    } else {
      setNoDataMessage('');
    }
  } else {
    // Jika searchTerm kosong, tampilkan semua data
    setFilteredCatatanData(catatanData);
    setFilteredArsipData(arsipData);

    // Jika pencarian kosong, setel pesan "Data tidak ditemukan" menjadi kosong
    setNoDataMessage('');
  }
}, [searchTerm, catatanData, arsipData]);

useEffect(() => {
  // Inisialisasi data saat komponen dimuat
  const initialData = getInitialData();
  const catatan = [];
  const arsip = [];
  initialData.forEach(item => {
    if (item.archived) {
      arsip.push(item);
    } else {
      catatan.push(item);
    }
  });
  setCatatanData(catatan);
  setArsipData(arsip);
}, []);

  return (
    <>
      <Header onSearch={setSearchTerm}/>

      <main className="xl:container xl:mx-auto p-2">
        <div className="flex w-full justify-center items-center flex-col gap-10">
          <div className="flex w-1/2 flex-col justify-center gap-4">
            <p className="text-xl">Buat Catatan</p>
            <form className="flex flex-col gap-4">
              <Inputan 
                values={formik.values.judul}
                onchange={handleInputChange}
                require={formik.errors.judul}
                />
              <div>
                <textarea 
                  className='bg-black w-full border rounded-md border-gray-100 p-2 text-sm focus:outline-none resize-none'
                  rows={9}
                  id="inputanText"
                  value={formik.values.deskripsi}
                  onChange={formik.handleChange}
                  name="deskripsi"
                  placeholder="Tuliskan catatanmu disini ......" />
                  <span className="text-red-500 text-xs">{formik.errors.deskripsi}</span>
              </div>
              <Button onclick={formik.handleSubmit}/>
            </form>
          </div>

          <div className="flex w-5/6 flex-col gap-4 justify-start">
            <p className="text-xl">Catatan Aktif</p>
            <div className="flex gap-4 justify-start items-start w-full">
              <div className="flex flex-wrap gap-2 justify-start items-start">
              {filteredCatatanData.length === 0 ? (
                  <span className="text-xl font-bold">Data tidak tersedia</span>
                ) : (
                  filteredCatatanData.map((item) => (
                    <Catatan 
                      key={item.id}
                      title={item.title}
                      date={item.createdAt}
                      text={item.body}
                      deleted={() => handleDelete(item.id)}
                      archives={() => handleArsip(item.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex w-5/6 flex-col gap-4 justify-start items-start">
            <p className="text-xl">Arsip</p>
            <div className="flex gap-4 justify-start items-start w-full">
              <div className="flex flex-wrap gap-2 justify-start items-start">
              {filteredArsipData.length === 0 ? (
                  <span className="text-xl font-bold">Data tidak tersedia</span>
                ) : (
                  filteredArsipData.map((item) => (
                    <Arsip 
                      key={item.id}
                      title={item.title}
                      date={item.createdAt}
                      text={item.body}
                      deleted={() => handleDelete(item.id)}
                      move={() => handlePindahkan(item.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          
        </div>

      </main>
    </>
  )
}

export default Form