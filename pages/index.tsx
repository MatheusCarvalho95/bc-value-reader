import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { IFilters, values } from "../services/values";
import DatePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface IPageProps {
  total: number;
  filters: IFilters;
}
const Home = ({ total, filters }: IPageProps) => {
  const [totalValue, setTotalValue] = useState<number>(total);
  const [dateRange, setDateRange] = useState([
    new Date(filters?.startDate),
    new Date(filters?.endDate),
  ]);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange.map((d) => {
        return dayjs(d).format("DD/MM/YYYY");
      });
      router.push({ query: { ...query, startDate, endDate } });
    }
  }, [dateRange]);

  useEffect(() => {
    setTotalValue(total);
  }, [total]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Valor total</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.datePicker}>
          <DatePicker
            value={dateRange}
            onChange={(date: Date[]) => {
              setDateRange(date);
            }}
            format="dd/MM/yyyy"
          />
        </div>
        <h1 className={styles.title}>Valor total</h1>
        <p className={styles.description}>{totalValue}</p>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(ctx: any) {
  let filters = ctx.query;
  Object.keys(ctx.query).map((key) => {
    if (ctx.query[key]) {
      filters[key] = ctx.query[key];
    }
  });

  if (!filters.startDate) {
    filters = {
      startDate: dayjs(new Date(Date.now()))
        .subtract(12, "month")
        .format("DD/MM/YYYY"),
      endDate: dayjs(new Date()).format("DD/MM/YYYY"),
    };
  }

  const response = await values.getValues(filters);

  return {
    props: {
      total: response,
      filters,
    },
  };
}
