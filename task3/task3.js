/* To improve the code and optimize the API requests, 
you can make use of Promise.all to fetch the student, school, 
and legal guardian data simultaneously for each selected student.
 Here's the modified code: */

import React, { useState } from "react";
import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";

const StudentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    const studentPromises = studentIds.map(async (studentId) => {
      const studentData = await fetchStudentData(studentId);
      setStudentsData((prevStudentsData) => [...prevStudentsData, studentData]);

      const { schoolId, legalguardianId } = studentData;

      const [schoolData, legalguardianData] = await Promise.all([
        fetchSchoolData(schoolId),
        fetchLegalguardianData(legalguardianId),
      ]);

      setSchoolsData((prevSchoolsData) => [...prevSchoolsData, schoolData]);
      setLegalguardiansData((prevLegalguardiansData) => [
        ...prevLegalguardiansData,
        legalguardianData,
      ]);
    });

    await Promise.all(studentPromises);
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        legalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default StudentsDataComponent;

/*
In this modified code, we use map to iterate over the selected student 
IDs and create an array of promises for fetching their data. We then use 
Promise.all to wait for all the promises to resolve.

By fetching the school and legal guardian data concurrently using 
Promise.all, we can optimize the API requests and reduce the waiting time. 
Once the promises resolve, we update the state arrays (schoolsData and 
legalguardiansData) with the new data.

Note that the component name has been changed to StudentsDataComponent
 to follow conventional naming conventions for React components. */
