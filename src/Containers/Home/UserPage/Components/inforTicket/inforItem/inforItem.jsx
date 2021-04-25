import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";

export default function InforItem(props) {
    const [toggle, setToggle] = useState(false);
    const [gioKhoiChieu, setgioKhoiChieu] = useState("");
    const {item,index} = props;

    useEffect(() => {
        randomTime();
        setTimeout(() => {
            if(index === 0)
            setToggle(true)
        }, 700);
        // eslint-disable-next-line
    }, [])

    const renderDanhSachGhe = () => {
        let listOfGhe = [];
        item.danhSachGhe.forEach((item)=>{
            if(item.tenGhe /16 <=1) listOfGhe.push(`A${item.tenGhe}`);
            else if(item.tenGhe / 16 <=2) listOfGhe.push("B"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=3) listOfGhe.push("C"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=4) listOfGhe.push("D"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=5) listOfGhe.push("E"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=6) listOfGhe.push("F"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=7) listOfGhe.push("G"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=8) listOfGhe.push("H"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=9) listOfGhe.push("I"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
            else if(item.tenGhe / 16 <=10) listOfGhe.push("K"+`0${+item.tenGhe % 16 === 0 ? 16 : +item.tenGhe % 16}`.slice(-2))
        })
        return listOfGhe.join(", ");
    }

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const randomTime = () => {
        let hour = Math.random()*8 + 14;
        let date = dayjs(item.ngayDat).add(Math.random()*3,"day").format("DD/MM/YYYY")
        
        setgioKhoiChieu(`${date} - ${Math.floor(hour)}:00`) ;
    }

    return (
        <>
            <li onClick={()=>{handleToggle()}} className="row" key={item.maVe} style={{borderTop:"1px solid gray",paddingTop:"15px",cursor:"pointer"}}>
            <p className="date col-sm-4">
              {dayjs(item.ngayDat).format("DD/MM/YYYY")} :{" "}
              {dayjs(item.ngayDat).format("HH:mm:ss")}
            </p>
            <div className="infor__detail col-sm-8 p-0 m-0">
            <p className="movieName col-sm-12">{item.tenPhim}</p>
            
            <div className={toggle? "col-sm-12 moreInfor active":"col-sm-12 moreInfor"}>
            {/* <div className="col-sm-12 moreInfor" style={{display: toggle? "block" : "none",transition:"all 0.5s"}}> */}
                <p className="maVe">Mã vé: {item.maVe}</p>
                <p className="time">Ngày chiếu:  {gioKhoiChieu}</p>
                <p className="tenHTR"> Hệ thống rạp: {item.danhSachGhe[0].tenHeThongRap} | {item.danhSachGhe[0].tenCumRap}</p>
                
                <div className="danhSachGhe pb-2">
                    Ghế: {renderDanhSachGhe()} 
                </div>
                <p className="giaVe">Tổng hóa đơn: {`${item.danhSachGhe.length*item.giaVe}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"}    </p> 

                {/* {item.danhSachGhe.length>1? item.giaVe.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ/ghế":""} */}
            </div>
            </div>
          </li>
        </>
    )
}
