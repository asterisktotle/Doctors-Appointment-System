import { createPatientProfile } from "@/service/patient.service";

const registerPatient = async (req, res) => {
    try {
        const result = await createPatientProfile(req.body)

        res.status(201).json({
			success: true,
			data: {
				user: result,
			},
		});


    } catch (error) {
        res.status(400).json({
			success: false,
			message: error.message,
		});
    }
}

const PatientController = {
    registerPatient,
}

export default PatientController;