import { useEffect, useState } from "react";
import "./App.css";
import { Phone } from "./services/phone.service";
import InputMask from "react-input-mask";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface Phone {
  id: number;
  comment: string;
  phone: string;
}

function App() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [valuePhone, setValuePhone] = useState<string>("");
  const [valueComment, setValueComment] = useState<string>("");
  const [valueMore, setValueMore] = useState<string>("");
  const [select, setSelect] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    try {
      Phone.getAll()
        .then((res) => setPhones(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="vibor">
        <button onClick={() => setSelect(1)}>1</button>
        <button onClick={() => setSelect(2)}>2</button>
      </div>
      {select === 1 ? (
        <form className="form_add" onSubmit={(e) => e.preventDefault()}>
          <div className="input">
            <InputMask
              mask="+7 (999) 999-99-99"
              placeholder="номер"
              value={valuePhone}
              onChange={(e) => setValuePhone(e.target.value)}
            />
            <textarea
              placeholder="комментарий"
              value={valueComment}
              onChange={(e) => setValueComment(e.target.value)}
            />
            <button
              onClick={() => {
                Phone.create({ comment: valueComment, phone: valuePhone });
              }}
            >
              добавить
            </button>
          </div>
        </form>
      ) : (
        <form className="form_add" onSubmit={(e) => e.preventDefault()}>
          <div className="input">
            <textarea
              className="more"
              placeholder='массив номеров: [{phone: "+7 (999) 999-99-99", comment: "описание"}]'
              value={valueMore}
              onChange={(e) => setValueMore(e.target.value)}
            />
            <button
              onClick={() => {
                Phone.createMore(JSON.parse(valueMore));
              }}
            >
              добавить
            </button>
          </div>
        </form>
      )}

      <input
        className="search"
        type="text"
        placeholder="поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="phones">
        {phones
          .filter(
            (e) =>
              e.phone
                .toLowerCase()
                .split(" ")
                .join("")
                .replaceAll("(", "")
                .replaceAll(")", "")
                .replaceAll("-", "")
                .includes(
                  search
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll("-", "")
                    .toLowerCase()
                    .split(" ")
                    .join("")
                ) ||
              e.comment
                .toLowerCase()
                .split(" ")
                .join("")
                .includes(search.toLowerCase().split(" ").join(""))
          )
          .map((e) => (
            <div className="phone" key={e.id}>
              <h4>{e.phone}</h4>
              <p>{e.comment}</p>
              <div className="phone-delete" onClick={() => Phone.delete(e.id)}>
                <RiDeleteBin6Fill />
              </div>
            </div>
          ))
          .reverse()}
      </div>
    </>
  );
}

export default App;
