import decimal
import time
from datetime import datetime
import json
from io import BytesIO, StringIO
import logger

logger = logger(__name__)

def run(self):
    
    key = {"job_id": self.job_id}
    result = False
    start_time = datetime.now()
    metadata = {
        "source_file_type": self.source_file_type,
        "pipeline_pattern": self.pipeline_pattern
    }

    """if file type is CSV."""
    if self.source_file_type.lower() == "csv":
        if self.pipeline_pattern.lower() == "simple":
            data = self.simple_csv_load(data)
        if self.pipeline_pattern.lower() == "standard":
            data = BytesIO(data)
        process_data(
            key=key,
            data=data,
        )

    elif self.source_file_type.lower() == "json":
        if self.pipeline_pattern.lower() == "simple":
            data = self.simple_json_load(data)
            data = json.dumps(data)
        if self.pipeline_pattern.lower() == "standard":
            data = json.dumps(data)
        process_data(
            key=key,
            data=data,
        )

    elif self.source_file_type.lower() in ["xlsx", "xls"]:
        df, file_name = self.convert_excel_to_dataframe(data, key)
        if self.pipeline_pattern.lower() == "simple":
            self.simple_csv_load(df)
        data = self.dataframe_to_csv_buffer(df)

        process_data(
            key=file_name,
            data=data,
        )

    elif self.source_file_type.lower() in ["html"]:
        df, file_name = self.convert_html_to_dataframe(data, key)
        if self.pipeline_pattern.lower() == "simple":
            self.simple_csv_load(df)
        data = self.dataframe_to_csv_buffer(df)
        process_data(
            key=file_name,
            data=data,
        )

    elif self.source_file_type.lower() in ["xml"]:
        data, file_name = self.convert_xml_to_json(data, key)
        if self.pipeline_pattern.lower() == "simple":
            data = self.simple_json_load(data)
            file_name = key
        process_data(
            key=file_name,
            data=data,
        )

    elif self.source_file_type.lower() in ["xml"]:
        data, file_name = self.convert_xml_to_json(data, key)
        if self.pipeline_pattern.lower() == "simple":
            data = self.simple_json_load(data)
            file_name = key
        process_data(
            key=file_name,
            data=data,
        )
        result = True
    else:
        logger.error(f"An error occurred")

    return result

def process_data(key, data):
    pass


