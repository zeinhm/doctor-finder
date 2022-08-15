import MainTemplate from "@/components/templates/MainTemplate";
import type { NextPage } from "next";
import Input from "@/components/Input";
import classNames from "classnames";
import { css } from "@emotion/css";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { client } from "@/service/core";
import Spinner from "@/components/Spinner";
import MultipleSelect from "@/components/MultipleSelect";
import DoctorCard from "@/components/DoctorCard";

const Home: NextPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedHospital, setSelectedHospital] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState([]);

  const { isLoading } = useQuery("fetchDoctors", client.fetchDoctors, {
    onSuccess: ({ data }) => {
      setDoctors(data);
    },
    onError: (err) => {
      console.log(err);
    },
    refetchOnWindowFocus: false,
  });

  const filteredDoctors = useMemo(() => {
    const filteredByName = doctors.filter((i) =>
      i.name.toLowerCase().includes(keyword)
    );

    const filteredByHospital = selectedHospital.length
      ? filteredByName.filter((i) =>
          selectedHospital.some((j) => j.id === i.hospital[0].id)
        )
      : filteredByName;

    const filteredBySpecialization = selectedSpecialization.length
      ? filteredByHospital.filter((i) =>
          selectedSpecialization.some((j) => j.id === i.specialization.id)
        )
      : filteredByHospital;

    return filteredBySpecialization;
  }, [doctors, selectedHospital, keyword, selectedSpecialization]);

  const hospitalOptions = useMemo(() => {
    const doctorHospitals = doctors.map((i) => i.hospital[0]);
    const uniqOptions = doctorHospitals.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.id === value.id && t.name === value.name)
    );
    const result = uniqOptions.map((i) => {
      return { ...i, value: i.id, label: i.name };
    });
    return result;
  }, [doctors]);

  const specializationOption = useMemo(() => {
    const doctorSpecialization = doctors.map((i) => i.specialization);
    const uniqOptions = doctorSpecialization.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.id === value.id && t.name === value.name)
    );
    const result = uniqOptions.map((i) => {
      return { ...i, value: i.id, label: i.name };
    });
    return result;
  }, [doctors]);

  return (
    <MainTemplate>
      <div className="w-full flex flex-col items-start pt-10 px-8">
        <div className="mb-8">
          <h1 className="mb-4">Doctor Finder</h1>
          <div className="flex items-center">
            <Input
              className={classNames(
                "mr-4",
                css`
                  width: 250px;
                `
              )}
              value={keyword}
              placeholder="Keyword"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <MultipleSelect
              className="mr-4"
              items={hospitalOptions}
              onChange={setSelectedHospital}
              value={selectedHospital}
              placeholder="Hospital"
            />
            <MultipleSelect
              items={specializationOption}
              onChange={setSelectedSpecialization}
              value={selectedSpecialization}
              placeholder="Specialization"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center w-full">
            <Spinner width={50} height={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 w-full justify-between">
            {filteredDoctors?.map((i) => (
              <DoctorCard item={i} />
            ))}
          </div>
        )}
      </div>
    </MainTemplate>
  );
};

export default Home;
