import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { Home } from './components/home';
import { FunnyForm } from './components/funnyForm';
import { BrowserRouter, Router, Routes } from 'react-router-dom';
import { funInfo } from './types/funInfoType';
import { FunnyNavbar } from './components/funnyNavbar';
function App() {
  const [data, setData] = useState([
    {
      "id": 1,
      "reporter": "محمد یوسفیان",
      "subject": "راضیم",
      "description": "بدون شرح"
    },
    {
      "id": 2,
      "reporter": "شهنام فیضیان",
      "subject": "خدایا",
      "description": "بدون شرح"
    },
    {
      "id": 3,
      "reporter": "وحید عقیل پور",
      "subject": "سید اس کیو ال سرور",
      "description": "بدون شرح"
    }
  ]);

  const checkIdExistanceBefore = (id: number): boolean => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.id === id) {
        return false;
      }
    }
    return true;
  }
  const generateUniqueId = (): number => {
    let r = Math.floor((Math.random() * 100000) + 1);
    while (!checkIdExistanceBefore(r)) {
      r = Math.floor((Math.random() * 100000) + 1);
    }
    return r;

  }
  const addNew = (item: funInfo): void => {
    const uniqueId: number = generateUniqueId();
    let newObject: funInfo = {
      id: uniqueId,
      subject: item.subject,
      description: item.description,
      reporter: item.reporter
    };
    let newData: funInfo[] = data;
    newData.push(newObject);
    setData(newData);
    console.log("state data is : ", data);
  };
  const findFunById = (id: number): funInfo | null => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }
  const findIndexByFun = (fun: funInfo): number => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element == fun) {
        return i;
      }
    }
    return -1;
  }
  const deleteFunById = (id: number): boolean => {
    console.log("i am in the delete func");
    console.log("id is : ", id);
    console.log(findFunById(id));
    if (findFunById(id) == null) {
      return false;
    }
    else {
      let newData: funInfo[] = [];
      for (let i = 0; i < data.length; i++) {
        const element: funInfo = data[i];
        if (element.id != id) {
          newData.push(element);
        }
        else {
          //do nothing
        }

      }
      console.log("new data after filtering is : ", newData);
      setData(newData);
      return true;
    }
  }
  return (
    <div className="App container">
      {/* <FunnyForm /> */}
      {/* <FunnyNavbar /> */}

      <BrowserRouter>
        <FunnyNavbar />
        <Routes>
          <Route path='/' element={<Home data={data} delete={deleteFunById} />} />
          <Route path='/funnyform' element={<FunnyForm onAdd={addNew} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
