import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getTagList } from "@/lib/auth_ops";
import ReactSelectInput from "./ReactSelectInput";

const TagSelect = ({
  tags = [],
  setTags,
  isError = false,
  errorMessage = null,
  readOnly = false,
}: any) => {
  const { t: tAuth } = useTranslation("auth");
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  // Memoized fetchTags function
  const fetchTags = useCallback(async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    try {
      setLoading(true);
      const res = await getTagList();
      if (res?.success && res?.data) {
        const mapped = res.data.map((t: any) => ({
          id: t.id,
          value: t.id,
          label: t.name,
          name: t.name,
        }));
        setTagList(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run fetchTags once on mount
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <>
      {readOnly ? (
        <ReactSelectInput
          isMulti
          value={tags}
          onChange={setTags}
          options={tagList}
          isLoading={loading}
          readOnly={readOnly}
          label={tAuth("tags")}
          placeholder={tAuth("tagsPlaceholder")}
          isError={isError}
          errorMessage={errorMessage}
          variant="primary"
          isSearchable={false}
          menuIsOpen={false}
        />
      ) : (
        <ReactSelectInput
          isMulti
          value={tags}
          onChange={setTags}
          options={tagList}
          isLoading={loading}
          readOnly={readOnly}
          label={tAuth("tags")}
          placeholder={tAuth("tagsPlaceholder")}
          isError={isError}
          errorMessage={errorMessage}
          variant="primary"
        />
      )}
    </>
  );
};

export default TagSelect;
