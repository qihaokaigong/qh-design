import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
} from "react-aria-components/Calendar";

import styles from "./Calendar.module.css";

interface CalendarPartsProps {
  nextLabel?: string;
  previousLabel?: string;
}

export function CalendarParts({
  nextLabel = "下个月",
  previousLabel = "上个月",
}: CalendarPartsProps) {
  return (
    <>
      <div className={styles.header}>
        <AriaButton
          slot="previous"
          className={styles.navigationButton}
          aria-label={previousLabel}
        >
          <ChevronLeft aria-hidden="true" />
        </AriaButton>
        <Heading className={styles.heading} />
        <AriaButton
          slot="next"
          className={styles.navigationButton}
          aria-label={nextLabel}
        >
          <ChevronRight aria-hidden="true" />
        </AriaButton>
      </div>
      <CalendarGrid className={styles.grid} weekdayStyle="short">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className={styles.weekday}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell className={styles.cell} date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </>
  );
}
