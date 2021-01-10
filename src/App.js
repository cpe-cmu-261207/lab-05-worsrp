import { createContext, useEffect, useReducer } from "react";
import CourseCard from "./components/CourseCard";
import CourseForm from "./components/CourseForm";
import { useContext, useState } from "react";

export const sample = createContext()

function App() {
  const [myCourses, setMyCourse] = useState([]);
  const [GPA, setGPA] = useState(4.0);
  useEffect(() => {
    const temp = localStorage.getItem('f')
    if(temp!=null){
      setMyCourse(JSON.parse(temp))
      calculateGPA(JSON.parse(temp))
    }
  },[])
  useEffect(() => {
    localStorage.setItem('f',JSON.stringify(myCourses))
  },[myCourses]) 
  /**
   * Calculate the GPA of current courses
   * @returns the GPA of current courses
   */
  function calculateGPA(cc) {
    // TODO
    var gpa = 0
    var total_credit  = 0 
    var total_gpa = 0
    cc.forEach((item) => {
      switch(item.grd){
        case 'A' :
          gpa = 4
          total_credit += Number(item.crd) 
          total_gpa += gpa * Number(item.crd)
          break
        case 'B+' :
          gpa = 3.5
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
        case 'B' :
          gpa = 3
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
        case 'C+' :
          gpa = 2.5
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
        case 'C' :
          gpa = 2
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
        case 'D+' :
          gpa = 1.5
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
        case 'D' :
          gpa = 1
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
        case 'F' :
          gpa = 0
          total_credit += Number(item.crd)
          total_gpa += gpa * Number(item.crd)
          break
      }  
    });
    setGPA(total_gpa / total_credit) 
  }

  /**
   * Should be called when a course is to be added to the list.
   * After adding the course to the list, the displayed GPA should be updated.
   * @param {*} event 
   */
  function addCourse(inputData) {
    console.log(inputData)
    // TODO
    const course = [...myCourses,inputData]
    setMyCourse(course)
    // recalculate GPA
    calculateGPA(course);
  }

  /**
   * Should be called when a course is to be removed from the list.
   * After removing the course from the list, the displayed GPA should be updated.
   * @param {*} id 
   */
  function onDeleteCourse(id) {
    // TODO
    const course = myCourses.filter(item => {
      return item.name !== id
    })
    setMyCourse(course)
    calculateGPA(course)
  }

  return (
    <sample.Provider value = {addCourse}>
      <div className=" bg-yellow-100 container mx-auto h-screen">
      <h1 className="bg-red-500 text-center text-4xl p-3 tracking-widest" class = "centre">
        GPA CALCULATOR
      </h1>
      {/* TODO add course input form */}
      {/* TODO display calculated GPA */}
      <h2 className = "bg-green-100 rounded-3xl p-1 text-center hover:bg-green-200" class = "result2">
        GPAX : {GPA}
      </h2>
      <div className="h-2/3 md:w-2/4 p-3 rounded-lg mx-auto overflow-auto">
        {/* TODO display courses */}
      <CourseForm /> 
      </div>
      <h2 className="text-2xl my-3" class = "centre">
          My courses
      </h2>
      {myCourses.map(item => {
          return <CourseCard name ={item.name} grd = {item.grd} crd ={item.crd} del={onDeleteCourse} />
        })}
    </div>
  </sample.Provider>
  );
}

export default App;