"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Loading from "@/components/common/Loading";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import CheckboxInput from "@/components/Form/CheckboxInput";
import ImageUploader from "@/components/Form/ImageUploader";
import InputComp from "@/components/Form/InputComp";
import { AppButton, TopBgComp } from "@/components/TopComp";
import {
  getGameGenres,
  getPlatforms,
  getNetworks,
  CreateGame,
  updateGame,
} from "@/lib/game_ops";
import { iconMapList } from "../quests/QuestFeed";
import DatePicker from "@/components/Form/DatePicker";
import EditableTableGeneric from "@/components/common/EditableTableGeneric";
import { handleApiMessage } from "@/lib/auth_ops";
import { useAlert } from "@/context/AlertContext";
import {
  getTagsDesc,
  parseTagsToList,
} from "../social/components/ContentEditModal";

const initFormData = {
  title: "",
  tagline: "", // new from games
  tags: "", // new from games
  description: "",
  platforms: [],
  genres: [],

  images: [],
  user_created_games_trailer_url: "", //not in games
  developer: "",

  download_link: "", // new from games
  website_link: "",
  user_created_games_support_contact_email: "", //not in games

  age_rating: "",
  in_app_purchases: "",
  user_created_games_anti_cheat_notes: "", //not in games
  user_created_games_legal_rights_confirmation: false, //not in games
  user_created_games_category: "", //remove

  release_date: "", // from games : not in design
  size: "", // from games : not in design
  features: [], // from games : not in design
  networks: [], // from games : not in design
  socials: [], // from games : not in design
};

export const socialList = [
  { name: "X", url: "" },
  { name: "Instagram", url: "" },
  { name: "Discord", url: "" },
  { name: "TikTok", url: "" },
];

export function getFormData(form) {
  const genres = form?.genres
    ?.map((item) => item?.id)
    .filter((id) => id != null);

  const networks = form?.networks
    ?.map((item) => item?.id)
    .filter((id) => id != null);

  const platforms = form?.platforms?.map((p) => ({
    id: p.id,
    url: p.url,
  }));

  const socials = form?.socials?.map((s) => ({
    name: s.name,
    url: s.url,
  }));

  // Final normalized object
  const data = { ...form, genres, networks, platforms, socials };

  const formData = new FormData();

  // ---- Normal fields (ignore array groups) ----
  for (const key in data) {
    if (
      ["images", "tags", "genres", "networks", "platforms", "socials"].includes(
        key
      )
    ) {
      continue;
    }

    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  // ---- Tags ----
  data.tags?.forEach((tag, index) => {
    formData.append(`tags[${index}]`, tag);
  });

  // ---- Genres ----
  data.genres?.forEach((id, index) => {
    formData.append(`genres[${index}]`, id);
  });

  // ---- Networks ----
  data.networks?.forEach((id, index) => {
    formData.append(`networks[${index}]`, id);
  });

  // ---- Platforms ----
  data.platforms?.forEach((p, index) => {
    if (p.id) formData.append(`platforms[${index}][id]`, p.id);
    if (p.url) formData.append(`platforms[${index}][url]`, p.url);
  });

  // ---- Socials (name + url) ----
  data.socials?.forEach((s, index) => {
    if (s.name) formData.append(`socials[${index}][name]`, s.name);
    if (s.url) formData.append(`socials[${index}][url]`, s.url);
  });

  // ---- Images ----
  form.images?.forEach((img, index) => {
    if (img.file) {
      formData.append(`images[${index}][file]`, img.file);
      formData.append(
        `images[${index}][is_primary]`,
        img.is_primary ? "1" : "0"
      );
    } else if (img.image_path || img.id) {
      if (img.id) formData.append(`images[${index}][id]`, img.id);
      formData.append(
        `images[${index}][is_primary]`,
        img.is_primary ? "1" : "0"
      );
    }
  });

  return formData;
}

export function SocialInputComp({ label, socialList, socials, onChange }) {
  const handleChange = (name: string, url: string) => {
    const updated = socialList.map((item) => {
      if (item.name === name) {
        return { ...item, url };
      }
      const existing = socials.find((s) => s.name === item.name);
      return existing ? existing : item;
    });

    onChange(updated);
  };

  return (
    <div>
      {label && (
        <label className="text-[var(--textOne)] text-md font-medium">
          {label}
        </label>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {socialList.map((obj: any) => {
          const Icon = iconMapList[obj.name];
          return (
            <div key={obj.name} className="relative w-full">
              <div
                className="
        absolute left-3 top-1/2 -translate-y-1/2 z-20
        w-8 h-8 rounded-lg bg-[var(--black-800)]
        flex items-center justify-center
    "
              >
                {Icon && <Icon className="text-[--var(textTwo)]" size={18} />}
              </div>

              <InputComp
                placeholder={`${obj.name} URL`}
                value={socials.find((s) => s.name === obj.name)?.url || ""}
                onChange={(e) => handleChange(obj.name, e.target.value)}
                className="pl-14"
                radius="10px"
                variant="primary"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export function PlatformInputTable({
  platforms = [],
  setPlatforms,
  initPlatformList = [],
}) {
  const options = initPlatformList.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <EditableTableGeneric
      title="Platforms"
      columns={[
        {
          key: "index",
          label: "Sno.",
          render: ({ rowIndex }) => rowIndex + 1,
        },

        {
          key: "name",
          label: "Platform",
          required: true,
          render: ({ value, rowIndex }) => {
            const selected = value
              ? options.find((opt) => opt.value === value)
              : null; // ✅ FIXED

            return (
              <div className="w-full">
                <ReactSelectInput
                  isMulti={false}
                  placeholder="Select Platform"
                  // isClearable
                  options={options}
                  value={selected} // ✅ no more null
                  onChange={(opt) => {
                    const updated = [...platforms];
                    updated[rowIndex] = {
                      ...updated[rowIndex],
                      id: opt?.value || null,
                      name: opt?.label || "",
                    };
                    setPlatforms(updated);
                  }}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : null
                  }
                />
              </div>
            );
          },
        },

        {
          key: "url",
          label: "Url",
          render: ({ value, onChange }) => (
            <InputComp
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter URL"
              required
              radius="10px"
            />
          ),
        },
      ]}
      rows={platforms}
      onChange={setPlatforms}
      defaultRow={{ id: null, name: "", url: "" }}
      addLabel="Add Platform"
    />
  );
}

export function CreateGameTopComp() {
  const { t: tScreen } = useTranslation("screen");

  const content = useMemo(() => {
    return {
      chip: [
        {
          label: tScreen("gameRegister.chip"),
          icon: "game",
          type: "primary",
        },
      ],
      title: tScreen("gameRegister.title"),
      highlightTitle: tScreen("gameRegister.highlightTitle"),
      description: tScreen("gameRegister.description"),
      backgroundImage: "/images/screens/games_bg.png",
    };
  }, [tScreen]); // 🔥 only updates when language changes

  return <TopBgComp content={content} />;
}

export default function GameForm({ type = "create", initGameData = null }) {
  const { isAuthenticated } = useAuth();
  const { t: tAuth } = useTranslation("auth");
  const { t: tScreen } = useTranslation("screen");
  const { lang } = useLanguage();
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [platformList, setPlatformList] = useState<any[]>([]);
  const [genresList, setGenresList] = useState<any[]>([]);
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [tags, setTags] = useState("");

  const initialMount = useRef(true);
  const [form, setForm] = useState(initFormData);
  const initError = {
    title: "",
    tagline: "",
    tags: "",
    description: "",
    genres: "",
    networks: "",
    download_link: "",
    release_date: "",
    images: "",
  };

  const [error, setError] = useState(initError);

  const formValidate = () => {
    const newError = { ...initError }; // clone object

    // name required
    if (!form?.title.trim()) newError.title = tAuth("validation.titleRequired");
    if (!form?.tagline.trim())
      newError.tagline = tAuth("validation.taglineRequired");
    if (!tags?.length) newError.tags = tAuth("validation.tagsRequired");
    if (!form?.description.trim())
      newError.description = tAuth("validation.descriptionRequired");
    if (!form?.release_date.trim())
      newError.release_date = tAuth("validation.dateRequired");

    if (!form.genres?.length)
      newError.genres = tAuth("validation.genresRequired");
    if (!form.networks?.length)
      newError.networks = tAuth("validation.networksRequired");
    if (!form.images?.length)
      newError.images = tAuth("validation.imagesRequired");

    setError(newError);
    console.log("in validate", newError);

    // return true if no errors
    return !Object.values(newError).some((val) => val);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const tagsList = parseTagsToList(tags);
    if (!formValidate()) {
      showAlert(tAuth("validation.fixValidation"), "error");
      return;
    }

    const formData = getFormData({ ...form, tags: tagsList });
    let res = {
      success: false,
      message: `${type === "create" ? "Update" : "Create"} Game failed`,
    };
    try {
      setLoading(true);

      if (type === "create") {
        res = await CreateGame(formData);
      } else {
        res = await updateGame({ id: initGameData?.id, data: formData });
      }
      if (res) {
        handleApiMessage(
          res?.message,
          showAlert,
          res?.success ? "success" : "error"
        );
      }
      if (res?.success && type === "create") {
        setForm(initFormData);
      }
    } catch {
      handleApiMessage(res?.message, showAlert, "error");
    } finally {
      setLoading(false);
    }

    if (!formValidate()) return;
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "range" ? Number(value) : value,
    }));
    // setError({ ...error, [name]: false });
  };

  // Fetch filters (statuses & genres)
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchFilters = async () => {
      setLoading(true);
      try {
        const [platformRes, genreRes, networkRes] = await Promise.all([
          getPlatforms(),
          getGameGenres(),
          getNetworks(),
        ]);

        if (platformRes?.success && platformRes?.data)
          setPlatformList(platformRes.data);
        if (genreRes?.success && genreRes?.data) setGenresList(genreRes.data);
        if (networkRes?.success && networkRes?.data)
          setNetworkList(networkRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Only skip duplicate fetch on initial mount
    if (initialMount.current) {
      initialMount.current = false;
      fetchFilters();
    } else {
      // For subsequent lang changes, always fetch
      fetchFilters();
    }
  }, [isAuthenticated, lang]);

  useEffect(() => {
    if (initGameData) {
      setForm(initGameData);
      const tagsDesc = getTagsDesc(initGameData?.tags);
      setTags(tagsDesc);
      setForm((prev) => ({
        ...prev,
        images: prev?.images?.map((img) => ({
          id: img.id,
          url: img.image_url,
          is_primary: !!img.is_primary,
        })),
      }));
    } else {
      setForm(initFormData);
    }
  }, [initGameData]);

  return (
    <div>
      <Loading loading={loading} />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 gradient-one border p-2 sm:p-4 rounded-[16px] flex flex-col  border-[var(--borderThree)]"
      >
        <h1 className="text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
          {tScreen("gameRegister.labels.gameBasics")}
        </h1>
        <InputComp
          label={tScreen("gameRegister.labels.gameTitle")}
          name="title"
          placeholder={tScreen("gameRegister.labels.gameTitlePlaceholder")}
          type="text"
          radius="10px"
          value={form?.title}
          onChange={handleChange}
          isRequired={true}
          isError={Boolean(error.title)}
          errorMessage={error.title}
        />
        <InputComp
          label={tScreen("gameRegister.labels.gameTagline")}
          name="tagline"
          placeholder={tScreen("gameRegister.labels.gameTaglinePlaceholder")}
          type="text"
          radius="10px"
          value={form?.tagline}
          onChange={handleChange}
          isRequired={true}
          isError={Boolean(error.tagline)}
          errorMessage={error.tagline}
        />
        <InputComp
          label={tScreen("gameRegister.labels.gameDesc")}
          name="description"
          placeholder={tScreen("gameRegister.labels.gameDescPlaceholder")}
          type="textarea"
          rows={3}
          radius="10px"
          value={form?.description}
          onChange={handleChange}
          isRequired={true}
          isError={Boolean(error.description)}
          errorMessage={error.description}
        />
        <InputComp
          name="tags"
          label={tScreen("gameRegister.labels.tags")}
          type="textarea"
          rows={1}
          radius="10px"
          placeholder={tScreen("contentCreator.post.hashtagsPlaceholder")}
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            setError((prev) => ({
              ...prev,
              tags: "",
            }));
          }}
          variant="secondary"
          isRequired={true}
          isError={Boolean(error.tags)}
          errorMessage={error.tags}
        />
        <ReactSelectInput
          isMulti
          value={form?.genres} // must be an array
          options={genresList}
          getOptionLabel={(opt: any) => opt.name}
          getOptionValue={(opt: any) => opt.id} // unique id
          label={tScreen("gameRegister.labels.genres")}
          placeholder={tScreen("gameRegister.labels.genresPlaceholder")}
          onChange={(genres: any) => {
            setForm({ ...form, genres });
            setError((prev) => ({
              ...prev,
              genres: "",
            }));
          }}
          isRequired={true}
          isError={Boolean(error.genres)}
          errorMessage={error.genres}
        />
        <ReactSelectInput
          isMulti
          value={form?.networks} // must be an array
          options={networkList}
          getOptionLabel={(opt: any) => opt.name}
          getOptionValue={(opt: any) => opt.id} // unique id
          label={tScreen("gameRegister.labels.networks")}
          placeholder={tScreen("gameRegister.labels.networksPlaceholder")}
          onChange={(networks: any) => {
            setForm({ ...form, networks });
            setError((prev) => ({
              ...prev,
              networks: "",
            }));
          }}
          isRequired={true}
          isError={Boolean(error.networks)}
          errorMessage={error.networks}
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <DatePicker
            label={tScreen("gameRegister.labels.releaseDate")}
            value={form?.release_date}
            onChange={(release_date: any) => {
              setForm({ ...form, release_date });
              setError((prev) => ({
                ...prev,
                release_date: "",
              }));
            }}
            required={true}
            isError={Boolean(error.release_date)}
            errorMessage={error.release_date}
          />
          <InputComp
            label={tScreen("gameRegister.labels.size")}
            name="size"
            placeholder={tScreen("gameRegister.labels.sizePlaceholder")}
            type="number"
            required={true}
            radius="10px"
            value={form?.size}
            onChange={handleChange}
          />
        </div>

        <SocialInputComp
          label="Socials"
          socialList={socialList}
          socials={form.socials}
          onChange={(list: any) => setForm({ ...form, socials: list })}
        />
        <PlatformInputTable
          initPlatformList={platformList}
          platforms={form?.platforms}
          setPlatforms={(platforms: any) => setForm({ ...form, platforms })}
        />

        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-[var(--textOne)] mt-3 mb-2">
            {tScreen("gameRegister.labels.mediaAssets")}
          </h1>
          <div className="text-[var(--textOne)] text-md font-medium mb-2">
            {tScreen("gameRegister.labels.screenshots")} *
          </div>
          <ImageUploader
            images={form?.images || []}
            isMulti={true}
            onChange={(newImages) => {
              setForm((prev) => ({
                ...prev,
                images: newImages.map((img, idx) => ({
                  ...img,
                  is_primary:
                    img.is_primary ||
                    (idx === 0 && !newImages.some((i) => i.is_primary)),
                })),
              }));
            }}
            isError={Boolean(error.images)}
            errorMessage={error.images}
          />
        </div>

        <InputComp
          label={tScreen("gameRegister.labels.trailerUrl")}
          name="user_created_games_trailer_url"
          placeholder={tScreen("gameRegister.labels.trailerUrlPlaceholder")}
          type="text"
          // required
          radius="10px"
          value={form?.user_created_games_trailer_url}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.studioDeveloper")}
          name="developer"
          placeholder={tScreen(
            "gameRegister.labels.studioDeveloperPlaceholder"
          )}
          type="text"
          required
          radius="10px"
          value={form?.developer}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.studioWebsite")}
          name="website_link"
          placeholder={tScreen("gameRegister.labels.studioWebsitePlaceholder")}
          type="text"
          // required
          radius="10px"
          value={form?.website_link}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.gameDownload")}
          name="download_link"
          placeholder={tScreen("gameRegister.labels.gameDownloadPlaceholder")}
          type="text"
          required
          radius="10px"
          value={form?.download_link}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.supportEmail")}
          name="user_created_games_support_contact_email"
          placeholder={tScreen("gameRegister.labels.supportEmailPlaceholder")}
          type="email"
          // required
          radius="10px"
          value={form?.user_created_games_support_contact_email}
          onChange={handleChange}
        />

        <h1 className="text-xl mt-4 lg:text-2xl font-semibold text-[var(--textOne)]">
          {tScreen("gameRegister.labels.validationCompliance")}
        </h1>
        <InputComp
          label={tScreen("gameRegister.labels.ageRating")}
          name="age_rating"
          placeholder={tScreen("gameRegister.labels.ageRatingPlaceholder")}
          type="text"
          required
          radius="10px"
          value={form?.age_rating}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.antiCheatNotes")}
          name="user_created_games_anti_cheat_notes"
          placeholder={tScreen("gameRegister.labels.antiCheatNotesPlaceholder")}
          type="textarea"
          rows={3}
          // required
          radius="10px"
          value={form?.user_created_games_anti_cheat_notes}
          onChange={handleChange}
        />
        <CheckboxInput
          label={tScreen("gameRegister.labels.licenseRights")}
          description={tScreen("gameRegister.labels.licenseRightsDesc")}
          variant="primary" // or primaryTwo / secondary
          checked={!!form?.user_created_games_legal_rights_confirmation} // boolean
          onChange={(checked) =>
            handleChange({
              target: {
                name: "user_created_games_legal_rights_confirmation",
                value: checked ? 1 : 0,
              },
            } as any)
          }
        />
        <AppButton
          actionType="submit"
          label={tScreen("gameRegister.labels.submit")}
        />
      </form>
    </div>
  );
}
