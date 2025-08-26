import { validator } from "@/middleware/user.middleware";
import { Router } from "express";
import PatientController from "@/controller/patient.controller";
import { PatientProfileSchema } from "@/middleware/validation/patientProfile.validation";

const { registerPatient } = PatientController

const PatientRouter = Router()


PatientRouter.post('/create-profile', validator(PatientProfileSchema), registerPatient)

export default PatientRouter;