import type { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
type WithSession<T> = T & InferGetServerSidePropsType<typeof getServerSideProps>
export default WithSession