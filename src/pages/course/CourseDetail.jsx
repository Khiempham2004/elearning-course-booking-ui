import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../utils/Auth';
import { message } from 'antd';

const imageModules = import.meta.glob("../../assets/Images/*", { eager: true });

const getLocalImage = (courseImage) => {
    if (!courseImage) return "";
    const filename = courseImage.split("/").pop();
    const key = Object.keys(imageModules).find((k) => k.includes(filename));
    return key ? imageModules[key].default : courseImage;
};

const CourseDetail = () => {

    const { id } = useParams();
    const [course, setCourse] = useState({});


    useEffect(() => {
        const getCourseDetail = async () => {
            try {
                const tokenDetail = getToken();

                const res = await axios.get(
                    `http://localhost:3000/api/courses/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenDetail}`
                        }
                    }
                );

                console.log(res.data);
                setCourse(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCourseDetail();
    }, []);

    const handleEnroll = async () => {
        try {
            const token = getToken();
            console.log(token);


            const res = await axios.post(
                'http://localhost:3000/api/enrollments',
                {
                    courseId: course._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);
            message.success("Đăng ký thành công");
        } catch (error) {
            console.log(error);
            message.error(
                error.response?.data?.message ||
                "Đăng ký thất bại"
            );
        }
    };

    return (
        <div>
            <div style={{ padding: 130 }}>
                <img
                    src={getLocalImage(course.courseImage)}
                    alt='CourseImage'
                    style={{
                        width: 400,
                        borderRadius: 10
                    }}
                />

                <h1>Course Name : {course.title}</h1>

                <p>Lessons: {course.lessons}</p>

                <h3>Level: {course.level}</h3>

                <h3>Instructor: {course.instructor}</h3>

                <h3>Price: ${course.price}</h3>
                

                <button onClick={handleEnroll}>
                    Enroll now
                </button>

            </div>

        </div>
    );
}

export default CourseDetail;