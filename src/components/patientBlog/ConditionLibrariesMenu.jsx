import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate on condition click
import axios from 'axios';
import condtionLibImage from './ConditionLibImage.png';
import asthma from '../../assests/img/asthma-condition.jpg'
import Diabetes from '../../assests/img/diabetes-conditions.jpg'
import viral_Infections from '../../assests/img/virusInfectionConditions.jpg'
import Womens_Health from '../../assests/img/WomensHealthCondition.jpg'
import Mens_Health from '../../assests/img/mensHealth-condition.jpg'
import brain from '../../assests/img/brain-condition.jpg'
import './ConditionLibrariesMenu.css'

const Conditions = () => {
    const [popularConditions, setPopularConditions] = useState([]);
    const [allConditions, setAllConditions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // To handle navigation

    useEffect(() => {
        const controller = new AbortController();
        const fetchConditions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions`, {
                    withCredentials: true,
                    signal: controller.signal
                });

                const conditionsWithNamesAndCount = response.data.conditions.map(condition => ({
                    name: condition,
                    count: response.data.categoryCountMapObj[condition] || 0
                }));

                setAllConditions(conditionsWithNamesAndCount);
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    console.error('Error fetching conditions:', err);
                }
            }
        };
        fetchConditions();

        return () => {
            controller.abort(); // Clean up the request if component unmounts
        };
    }, []);


    useEffect(() => {
        const popular = allConditions.slice(0, 6);
        setPopularConditions(popular);
    }, [allConditions]);

    const filteredConditions = allConditions.filter(condition =>
        condition?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
    );
    


    // Handle condition click
    const handleConditionClick = (conditionName) => {
        if (conditionName) {
            navigate(`/condition-libraries/${conditionName}`); // Safely navigate if the condition name is defined
        }
    };
    

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col-8'>
                    {/* <img src={condtionLibImage} alt="Condition Library" /> */}
                    <div className="mb-5">
                        <h2 className="condition-lib-head1">Conditions <span>Libraries</span></h2>
                        <p className="condition-lib-info">Find information on symptoms, diagnosis, and treatment options to discuss with your doctor.</p>
                    </div>

                    <h2 className="popular-conditions-heading">Popular Conditions</h2>
                    <div className="row g-4 mb-5">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className=" h-100" onClick={() => handleConditionClick('Asthma')}>
                                <img src={asthma} className="card-img-top" alt={'asthma'} />
                                <div className="popular-condition">
                                    <h5 className="popular-condition-name my-4 mx-1">{'Asthma'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className=" h-100" onClick={() => handleConditionClick('Diabetes')}>
                                <img src={Diabetes} className="card-img-top" alt={'Diabetes'} />
                                <div className="popular-condition">
                                    <h5 className="popular-condition-name my-4 mx-1">{'Diabetes'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className=" h-100" onClick={() => handleConditionClick('Viral Infections')}>
                                <img src={viral_Infections} className="card-img-top" alt={'Viral Infections'} />
                                <div className="popular-condition">
                                    <h5 className="popular-condition-name my-4 mx-1">{'Viral Infections'}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className=" h-100" onClick={() => handleConditionClick("Women's Health")}>
                                <img src={Womens_Health} className="card-img-top" alt={"Women's Health"} />
                                <div className="popular-condition">
                                    <h5 className="popular-condition-name my-4 mx-1">{"Women's Health"}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className=" h-100" onClick={() => handleConditionClick("Men's Health")}>
                                <img src={Mens_Health} className="card-img-top" alt={"Men's Health"} />
                                <div className="popular-condition">
                                    <h5 className="popular-condition-name my-4 mx-1">{"Men's Health"}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className=" h-100" onClick={() => handleConditionClick('Brain and Nerves')}>
                                <img src={brain} className="card-img-top" alt={'Brain and Nerves'} />
                                <div className="popular-condition">
                                    <h5 className="popular-condition-name my-4 mx-1">{'Brain and Nerves'}</h5>
                                </div>
                            </div>
                        </div>
                        {/* {popularConditions.map((condition, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className=" h-100" onClick={() => handleConditionClick(condition.name)}>
                                    <img src={condition.img || asthma} className="card-img-top" alt={condition.name} />
                                    <div className="popular-condition">
                                        <h5 className="popular-condition-name my-4 mx-1">{condition.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                    </div>

                    <div className=" pt-4">
                        <div className='allConditionsConditionLibraries'>
                            <h1 className="allConditions-Conlib mb-4">See All</h1>
                        </div>
                        <div className="FindConditionsConLib mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Find conditions"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="row allConditionsLib mb-4">
                            {filteredConditions.length > 0 ? (
                                <>
                                    <div className="col-md-6">
                                        <ul className="list-unstyled">
                                            {filteredConditions.slice(0, Math.ceil(filteredConditions.length / 2)).map((condition, index) => (
                                                <li key={index} className="mb-3" onClick={() => handleConditionClick(condition.name)}>
                                                    {condition.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-unstyled">
                                            {filteredConditions.slice(Math.ceil(filteredConditions.length / 2)).map((condition, index) => (
                                                <li key={index} className="mb-3" onClick={() => handleConditionClick(condition.name)}>
                                                    {condition.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <p>No conditions found</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Conditions;
