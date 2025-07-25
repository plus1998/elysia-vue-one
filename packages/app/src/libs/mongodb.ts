import { connect } from "mongoose";
import config from "../config";

const { mongodb } = config;

if (!mongodb) {
    throw new Error("MongoDB未配置");
}

const connection = await connect(mongodb.uri, mongodb.options);

export const db = connection;
