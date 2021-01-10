const CourseCard = (props) => {
  return (
    <>
       <div class="centre">
     <section class="result">
      <article>Class Name: {props.name}</article>
      <nav>GPA : {props.grd}</nav>
      <nav>Credits : {props.crd}</nav>
      <nav><button class = "tail" onClick = {() =>props.del(props.name)} > x </button></nav>
       </section>
   </div>
    </>
  );
};

export default CourseCard;
