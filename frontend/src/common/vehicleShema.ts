
import * as yup from "yup";

export const vehicleSchema = yup.object().shape({
  vehicleNumber: yup.string()
    .required("Vehicle number is required"),

  vehicleType: yup.string()
    .oneOf([
      "TRUCK", "VAN", "CAR", "MOTORCYCLE", "BUS",
      "TRAILER", "TANKER", "REFRIGERATED_TRUCK",
      "FLATBED", "PICKUP"
    ])
    .required("Vehicle type is required"),

  make: yup.string().required("Make is required"),
  model: yup.string().required("Model is required"),

  year: yup.number()
    .typeError("Year must be a number")
    .min(1900, "Year cannot be less than 1900")
    .max(new Date().getFullYear() + 1, "Invalid year")
    .required("Year is required"),

  color: yup.string().nullable(),

  vinNumber: yup.string()
    .max(17, "VIN cannot exceed 17 characters")
    .nullable(),

  licensePlate: yup.string()
    .required("License plate is required"),

  registrationExpiry: yup.date().nullable(),
  insuranceExpiry: yup.date().nullable(),

  capacity: yup.number()
    .typeError("Capacity must be numeric")
    .nullable(),

  fuelType: yup.string()
    .oneOf(["PETROL", "DIESEL", "ELECTRIC", "HYBRID", "CNG", "LPG"])
    .required("Fuel type is required"),

  mileage: yup.number()
    .typeError("Mileage must be a number")
    .nullable(),

  status: yup.string()
    .oneOf(["ACTIVE", "INACTIVE", "MAINTENANCE", "RETIRED", "OUT_OF_SERVICE"])
    .required("Status is required"),

  lastServiceDate: yup.date().nullable(),
  nextServiceDate: yup.date().nullable(),

  purchaseDate: yup.date().nullable(),
  purchasePrice: yup.number().nullable(),
  currentValue: yup.number().nullable(),

  gpsTrackerId: yup.string().nullable(),

  notes: yup.string().nullable(),
});