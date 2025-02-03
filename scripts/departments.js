import db from "../db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importDepartments() {
  try {
    // Read the departments.json file
    const departmentsPath = path.join(__dirname, "../data/departments.json");
    const departmentsData = JSON.parse(
      fs.readFileSync(departmentsPath, "utf8")
    );

    // Transform data into the format needed for bulk insert
    const departments = departmentsData.Subjects.map((subject) => ({
      prefix: subject.Value,
      name: subject.Description,
    }));

    // First, delete all existing departments
    await db.department.deleteMany();

    // Then create all departments in a single batch operation
    const result = await db.department.createMany({
      data: departments,
      skipDuplicates: true,
    });

    console.log(`Successfully imported ${result.count} departments`);
  } catch (error) {
    console.error("Error importing departments:", error);
  } finally {
    await db.$disconnect();
  }
}

// Run the import
importDepartments();
