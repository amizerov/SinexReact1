import styled from "@emotion/styled";

const BtnPeriod = ({ day, selected, onClick }) => {
  const Btn = styled("div")(({ theme }) => ({
    backgroundColor: selected ? "gold" : "#222",
    border: "1px solid gold",
    color: selected ? "black" : "#fff",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    cursor: "pointer",
    marginRight: 20,
    fontFamily: "Montserrat",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  }));

  return <Btn onClick={onClick}>{day.label}</Btn>;
};

export default BtnPeriod;
