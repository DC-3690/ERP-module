import { ThreeCircles } from "react-loader-spinner";

export function calc_exp(val) {
  const startDate = new Date(val);
  const endDate = new Date();
  const diffTime = Math.floor(endDate.getTime() - startDate.getTime());

  const year = Math.trunc(diffTime / 31557600000);
  const month = Math.trunc((diffTime % 31557600000) / 2628002880);
  const Days = Math.trunc(((diffTime % 31557600000) % 2628002880) / 86400000);

  let duration = `(${year}) Year (${month}) Month (${Days}) Days`;

  return [val, duration];
}

export function Three_circles(props) {
  return (
    <>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={props.show}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#2F3990"
        innerCircleColor="#DFE1E6"
        middleCircleColor="#2F3990"
      />
    </>
  );
}
