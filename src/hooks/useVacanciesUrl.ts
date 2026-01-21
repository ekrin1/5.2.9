/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchVacanciesThunk, setPage, setSearch, setCity, setSkills } from "../store/vacanciesSlice";
import { useParams } from "react-router-dom";

export const useVacanciesUrl = () => {

  const dispatch = useAppDispatch();
  const { city: cityFromPath } = useParams();

  const { items, loading, page, totalPages, search, city, skills } =
    useAppSelector((state) => state.vacancies);

  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRen = useRef(true);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlSkillsParam = searchParams.get("skills");
    const urlSkills = urlSkillsParam
      ? urlSkillsParam.split(",").filter(Boolean)
      : null;
    const urlPage = Number(searchParams.get("page")) || 1;

    if (urlPage !== page) dispatch(setPage(urlPage));
    if (urlSearch !== search) {
      dispatch(setSearch(urlSearch));
    }
    if (urlSkills && urlSkills.join(",") !== skills.join(",")) {
      dispatch(setSkills(urlSkills));
    }
  }, [searchParams]);

  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (skills.length > 0) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    if (isFirstRen.current) {
      setSearchParams(params, { replace: true });
      isFirstRen.current = false;
    } else {
      setSearchParams(params);
    }
  }, [search, skills, page]);

  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchVacanciesThunk());
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [search, city, skills, page]);

  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const normalizedCity = cityFromPath ?? "";
    if (normalizedCity !== city) {
      dispatch(setCity(normalizedCity));
      dispatch(setPage(1));
    }
  }, [cityFromPath]);
  
  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [page, totalPages]);

  // ---------------------------------------------------------------------------------------------------------

  const handlePageChange = (p: number) => {
    dispatch(setPage(p));
  };

  return {
    items,
    loading,
    page,
    totalPages,
    handlePageChange,
  };
};

