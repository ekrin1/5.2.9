/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchVacanciesThunk, setPage, setSearch, setCity, setSkills } from "../store/vacanciesSlice";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

export const useVacanciesUrl = () => {

  const { items, loading, page, totalPages, search, city, skills } =
    useAppSelector((state) => state.vacancies);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
    if (location.pathname === "/vacancies" && city !== "") {
      dispatch(setCity(""));
      dispatch(setPage(1));
    } else if (location.pathname.includes("/moscow") && city !== "moscow") {
      dispatch(setCity("moscow"));
      dispatch(setPage(1));
    } else if (
      location.pathname.includes("/petersburg") &&
      city !== "petersburg"
    ) {
      dispatch(setCity("petersburg"));
      dispatch(setPage(1));
    }
  }, [location.pathname]);
  
  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      dispatch(setPage(totalPages));
    }
  }, [page, totalPages]);

  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (skills.length > 0) params.skills = skills.join(",");
    if (page > 1) params.page = page.toString();

    const query = new URLSearchParams(params).toString();

    const url = city
      ? `/vacancies/${city}${query ? `?${query}` : ""}`
      : `/vacancies${query ? `?${query}` : ""}`;

    navigate(url, { replace: true });
  }, [city, search, skills, page]);

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

