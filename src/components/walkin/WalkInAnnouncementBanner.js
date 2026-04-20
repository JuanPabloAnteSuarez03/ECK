import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as ClockIcon } from "feather-icons/dist/icons/clock.svg";
import { useI18n } from "context/LanguageContext.js";
import {
  formatBannerDate,
  formatIntervalLine,
  monctonDateString,
  pickBannerDay,
} from "utils/walkinSchedule.js";

const Bar = styled.section`
  ${tw`w-full border-b border-primary-900/10`}
  background: linear-gradient(90deg, rgba(212, 16, 18, 0.07) 0%, rgba(244, 242, 243, 0.95) 45%, rgba(255, 255, 255, 0.98) 100%);
`;

const Inner = tw.div`max-w-screen-xl mx-auto px-6 sm:px-8 py-4 md:py-5`;
const Row = tw.div`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6`;
const Left = tw.div`flex items-start gap-3 min-w-0`;
const IconWrap = tw.div`flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/15 flex items-center justify-center text-primary-600`;
const TextCol = tw.div`min-w-0`;
const Kicker = tw.p`text-xs font-bold uppercase tracking-widest text-primary-600`;
const Title = tw.h2`text-sm sm:text-base font-black text-gray-900 leading-snug`;
const Sub = tw.p`text-xs sm:text-sm text-gray-600 mt-1`;
const Times = tw.div`flex flex-wrap gap-x-3 gap-y-1 text-sm sm:text-base font-semibold text-gray-800`;

export default function WalkInAnnouncementBanner() {
  const { t, locale } = useI18n();
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/public-walkin", { credentials: "same-origin" });
        const json = await res.json().catch(() => null);
        if (cancelled) return;
        if (res.ok && json && json.ok && json.data) {
          setPayload(json.data);
        } else {
          setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error || !payload || !Array.isArray(payload.days)) return null;

  const todayStr = monctonDateString();
  const picked = pickBannerDay(payload.days, todayStr);
  if (!picked) return null;

  const { mode, day } = picked;
  const locKey = locale === "fr" ? "fr" : "en";
  const title =
    mode === "today" ? t("walkin.banner.titleToday") : t("walkin.banner.titleUpcoming");

  const dateLabel = formatBannerDate(day.date, locKey);
  const intervalLines =
    Array.isArray(day.intervals) && day.intervals.length > 0
      ? day.intervals.map((iv) => formatIntervalLine(iv.start, iv.end, locKey))
      : [];

  return (
    <Bar>
      <Inner>
        <Row>
          <Left>
            <IconWrap aria-hidden>
              <ClockIcon tw="w-5 h-5 stroke-[2.5]" />
            </IconWrap>
            <TextCol>
              <Kicker>{t("walkin.banner.kicker")}</Kicker>
              <Title>
                {title} · {dateLabel}
              </Title>
              <Sub>{t("walkin.banner.subtitle")}</Sub>
            </TextCol>
          </Left>
          {(intervalLines.length > 0 || (day.note && day.note.trim())) && (
            <div tw="sm:text-right min-w-0 w-full sm:w-auto">
              {intervalLines.length > 0 && (
                <Times>
                  {intervalLines.map((line, i) => (
                    <span key={i} tw="inline-flex items-center">
                      {i > 0 && <span tw="hidden sm:inline text-gray-400 mx-1">·</span>}
                      <span>{line}</span>
                    </span>
                  ))}
                </Times>
              )}
              {day.note && day.note.trim() && (
                <p tw="mt-2 text-xs sm:text-sm text-gray-700 max-w-xl sm:ml-auto">{day.note.trim()}</p>
              )}
            </div>
          )}
        </Row>
      </Inner>
    </Bar>
  );
}
