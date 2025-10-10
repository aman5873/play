"use client";

import Loading from "@/components/common/Loading";
import ReactSelectInput from "@/components/common/ReactSelectInput";
import CheckboxInput from "@/components/Form/CheckboxInput";
import ImageUploader from "@/components/Form/ImageUploader";
import InputComp from "@/components/Form/InputComp";
import { AppButton, TopBgComp } from "@/components/TopComp";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getGameGenres, getPlatforms } from "@/lib/game_ops";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const initFormData = {
  title: "",
  tagline: "", // new from games
  description: "",
  platforms: [],
  genres: [],

  gameModes: [], //not in games
  images: [],
  trailerUrl: "", //not in games
  developer: "",

  download_link: "", // new from games
  website_link: "",
  supportEmail: "", //not in games

  age_rating: "",
  anti_cheat_notes: "", //not in games
  min_client_version: "", //not in games
  license_rights: false, //not in games

  release_date: "", // from games : not in design
  status_id: "", // from games : not in design
  features: [], // from games : not in design
  networks: [], // from games : not in design
  socials: [], // from games : not in design
};

export function CreateGameTopComp() {
  const { t: tScreen } = useTranslation("screen");
  return (
    <TopBgComp
      content={{
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
        // "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop",
      }}
    />
  );
}
export default function GameForm() {
  const { isAuthenticated } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const { t: tScreen } = useTranslation("screen");
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [platformList, setPlatformList] = useState<any[]>([]);
  const [genresList, setGenresList] = useState<any[]>([]);

  const initialMount = useRef(true);
  const [form, setForm] = useState(initFormData);

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
        const [platformRes, genreRes] = await Promise.all([
          getPlatforms(),
          getGameGenres(),
        ]);

        if (platformRes?.success && platformRes?.data)
          setPlatformList(platformRes.data);
        if (genreRes?.success && genreRes?.data) setGenresList(genreRes.data);
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

  return (
    <div>
      <Loading loading={loading} />

      <form className="flex flex-col gap-4 gradient-one border p-2 sm:p-4 rounded-[16px] flex flex-col  border-[var(--borderThree)]">
        <h1 className="text-xl lg:text-2xl font-semibold text-[var(--textOne)]">
          {tScreen("gameRegister.labels.gameBasics")}
        </h1>
        <InputComp
          label={tScreen("gameRegister.labels.gameTitle")}
          name="title"
          placeholder={tScreen("gameRegister.labels.gameTitlePlaceholder")}
          type="text"
          required
          radius="10px"
          value={form?.title}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.gameTagline")}
          name="tagline"
          placeholder={tScreen("gameRegister.labels.gameTaglinePlaceholder")}
          type="text"
          required
          radius="10px"
          value={form?.tagline}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.gameDesc")}
          name="description"
          placeholder={tScreen("gameRegister.labels.gameDescPlaceholder")}
          type="textarea"
          rows={3}
          required
          radius="10px"
          value={form?.description}
          onChange={handleChange}
        />
        <ReactSelectInput
          isMulti
          value={form?.genres} // must be an array
          options={genresList}
          getOptionLabel={(opt: any) => opt.name}
          getOptionValue={(opt: any) => opt.id} // unique id
          label={tScreen("gameRegister.labels.genres")}
          placeholder={tScreen("gameRegister.labels.genresPlaceholder")}
          onChange={(selected: any) => setForm({ ...form, genres: selected })}
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
          />
        </div>

        <InputComp
          label={tScreen("gameRegister.labels.trailerUrl")}
          name="trailerUrl"
          placeholder={tScreen("gameRegister.labels.trailerUrlPlaceholder")}
          type="text"
          required
          radius="10px"
          value={form?.trailerUrl}
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
          required
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
          name="supportEmail"
          placeholder={tScreen("gameRegister.labels.supportEmailPlaceholder")}
          type="email"
          required
          radius="10px"
          value={form?.supportEmail}
          onChange={handleChange}
        />
        <InputComp
          label={tScreen("gameRegister.labels.gameDownload")}
          name="download_link"
          placeholder={tScreen("gameRegister.labels.gameDownloadPlaceholder")}
          type="number"
          required
          radius="10px"
          value={form?.download_link}
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
          name="anti_cheat_notes"
          placeholder={tScreen("gameRegister.labels.antiCheatNotesPlaceholder")}
          type="textarea"
          rows={3}
          required
          radius="10px"
          value={form?.anti_cheat_notes}
          onChange={handleChange}
        />
        <CheckboxInput
          label={tScreen("gameRegister.labels.licenseRights")}
          description={tScreen("gameRegister.labels.licenseRightsDesc")}
          variant="primary" // or primaryTwo / secondary
          checked={!!form?.license_rights} // boolean
          onChange={(checked) =>
            handleChange({
              target: { name: "license_rights", value: checked },
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
