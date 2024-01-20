import Course from "@/app/components/Course/Course";
import React from "react";

type Props = {};

const CoursePage = async ({ params }) => {
  return <Course id={params.id} />;
};

export default CoursePage;
