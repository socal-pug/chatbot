s = `# HELP monitor_cert_days_remaining The number of days remaining until the certificate expires
# TYPE monitor_cert_days_remaining gauge

# HELP monitor_cert_is_valid Is the certificate still valid? (1 = Yes, 0= No)
# TYPE monitor_cert_is_valid gauge

# HELP monitor_response_time Monitor Response Time (ms)
# TYPE monitor_response_time gauge
monitor_response_time{monitor_name="Stats Recorder",monitor_type="push",monitor_url="https://",monitor_hostname="null",monitor_port="null"} -1
monitor_response_time{monitor_name="Steam Chatbot",monitor_type="push",monitor_url="https://",monitor_hostname="null",monitor_port="null"} -1
monitor_response_time{monitor_name="Backend API",monitor_type="port",monitor_url="https://www.socalpug.com:5000",monitor_hostname="127.0.0.1",monitor_port="5000"} 1

# HELP monitor_status Monitor Status (1 = UP, 0= DOWN, 2= PENDING, 3= MAINTENANCE)
# TYPE monitor_status gauge
monitor_status{monitor_name="Stats Recorder",monitor_type="push",monitor_url="https://",monitor_hostname="null",monitor_port="null"} 1
monitor_status{monitor_name="Steam Chatbot",monitor_type="push",monitor_url="https://",monitor_hostname="null",monitor_port="null"} 1
monitor_status{monitor_name="Backend API",monitor_type="port",monitor_url="https://www.socalpug.com:5000",monitor_hostname="127.0.0.1",monitor_port="5000"} 1

# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 34.579743

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 15.379662

# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 49.959405

# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1718028667

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 85225472

# HELP process_virtual_memory_bytes Virtual memory size in bytes.
# TYPE process_virtual_memory_bytes gauge
process_virtual_memory_bytes 1042944000

# HELP process_heap_bytes Process heap size in bytes.
# TYPE process_heap_bytes gauge
process_heap_bytes 945631232

# HELP process_open_fds Number of open file descriptors.
# TYPE process_open_fds gauge
process_open_fds 28

# HELP process_max_fds Maximum number of open file descriptors.
# TYPE process_max_fds gauge
process_max_fds 1048576

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0

# HELP nodejs_eventloop_lag_min_seconds The minimum recorded event loop delay.
# TYPE nodejs_eventloop_lag_min_seconds gauge
nodejs_eventloop_lag_min_seconds 0.00003048

# HELP nodejs_eventloop_lag_max_seconds The maximum recorded event loop delay.
# TYPE nodejs_eventloop_lag_max_seconds gauge
nodejs_eventloop_lag_max_seconds 0.761790463

# HELP nodejs_eventloop_lag_mean_seconds The mean of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_mean_seconds gauge
nodejs_eventloop_lag_mean_seconds 0.01025341081666402

# HELP nodejs_eventloop_lag_stddev_seconds The standard deviation of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_stddev_seconds gauge
nodejs_eventloop_lag_stddev_seconds 0.0021262538226183955

# HELP nodejs_eventloop_lag_p50_seconds The 50th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p50_seconds gauge
nodejs_eventloop_lag_p50_seconds 0.010108927

# HELP nodejs_eventloop_lag_p90_seconds The 90th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p90_seconds gauge
nodejs_eventloop_lag_p90_seconds 0.010166271

# HELP nodejs_eventloop_lag_p99_seconds The 99th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p99_seconds gauge
nodejs_eventloop_lag_p99_seconds 0.011632639

# HELP nodejs_active_handles Number of active libuv handles grouped by handle type. Every handle type is C++ class name.
# TYPE nodejs_active_handles gauge
nodejs_active_handles{type="Pipe"} 1
nodejs_active_handles{type="Socket"} 5
nodejs_active_handles{type="Server"} 1

# HELP nodejs_active_handles_total Total number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 7

# HELP nodejs_active_requests Number of active libuv requests grouped by request type. Every request type is C++ class name.
# TYPE nodejs_active_requests gauge

# HELP nodejs_active_requests_total Total number of active requests.
# TYPE nodejs_active_requests_total gauge
nodejs_active_requests_total 0

# HELP nodejs_heap_size_total_bytes Process heap size from Node.js in bytes.
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes 75538432

# HELP nodejs_heap_size_used_bytes Process heap size used from Node.js in bytes.
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes 63923352

# HELP nodejs_external_memory_bytes Node.js external memory size in bytes.
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes 19849106

# HELP nodejs_heap_space_size_total_bytes Process heap space size total from Node.js in bytes.
# TYPE nodejs_heap_space_size_total_bytes gauge
nodejs_heap_space_size_total_bytes{space="read_only"} 176128
nodejs_heap_space_size_total_bytes{space="old"} 60383232
nodejs_heap_space_size_total_bytes{space="code"} 892928
nodejs_heap_space_size_total_bytes{space="map"} 4988928
nodejs_heap_space_size_total_bytes{space="large_object"} 8048640
nodejs_heap_space_size_total_bytes{space="code_large_object"} 0
nodejs_heap_space_size_total_bytes{space="new_large_object"} 0
nodejs_heap_space_size_total_bytes{space="new"} 1048576

# HELP nodejs_heap_space_size_used_bytes Process heap space size used from Node.js in bytes.
# TYPE nodejs_heap_space_size_used_bytes gauge
nodejs_heap_space_size_used_bytes{space="read_only"} 167680
nodejs_heap_space_size_used_bytes{space="old"} 51789296
nodejs_heap_space_size_used_bytes{space="code"} 643872
nodejs_heap_space_size_used_bytes{space="map"} 3056976
nodejs_heap_space_size_used_bytes{space="large_object"} 7838816
nodejs_heap_space_size_used_bytes{space="code_large_object"} 0
nodejs_heap_space_size_used_bytes{space="new_large_object"} 0
nodejs_heap_space_size_used_bytes{space="new"} 438344

# HELP nodejs_heap_space_size_available_bytes Process heap space size available from Node.js in bytes.
# TYPE nodejs_heap_space_size_available_bytes gauge
nodejs_heap_space_size_available_bytes{space="read_only"} 0
nodejs_heap_space_size_available_bytes{space="old"} 7429328
nodejs_heap_space_size_available_bytes{space="code"} 183520
nodejs_heap_space_size_available_bytes{space="map"} 1844320
nodejs_heap_space_size_available_bytes{space="large_object"} 0
nodejs_heap_space_size_available_bytes{space="code_large_object"} 0
nodejs_heap_space_size_available_bytes{space="new_large_object"} 1031072
nodejs_heap_space_size_available_bytes{space="new"} 592728

# HELP nodejs_version_info Node.js version info.
# TYPE nodejs_version_info gauge
nodejs_version_info{version="v16.0.0",major="16",minor="0",patch="0"} 1

# HELP nodejs_gc_duration_seconds Garbage collection duration by kind, one of major, minor, incremental or weakcb.
# TYPE nodejs_gc_duration_seconds histogram
nodejs_gc_duration_seconds_bucket{le="0.001",kind="minor"} 987
nodejs_gc_duration_seconds_bucket{le="0.01",kind="minor"} 2056
nodejs_gc_duration_seconds_bucket{le="0.1",kind="minor"} 2059
nodejs_gc_duration_seconds_bucket{le="1",kind="minor"} 2060
nodejs_gc_duration_seconds_bucket{le="2",kind="minor"} 2060
nodejs_gc_duration_seconds_bucket{le="5",kind="minor"} 2060
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="minor"} 2060
nodejs_gc_duration_seconds_sum{kind="minor"} 2.6192154073715237
nodejs_gc_duration_seconds_count{kind="minor"} 2060
nodejs_gc_duration_seconds_bucket{le="0.001",kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="0.01",kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="0.1",kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="1",kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="2",kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="5",kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="incremental"} 8
nodejs_gc_duration_seconds_sum{kind="incremental"} 0.0026282801628112794
nodejs_gc_duration_seconds_count{kind="incremental"} 8
nodejs_gc_duration_seconds_bucket{le="0.001",kind="major"} 0
nodejs_gc_duration_seconds_bucket{le="0.01",kind="major"} 0
nodejs_gc_duration_seconds_bucket{le="0.1",kind="major"} 6
nodejs_gc_duration_seconds_bucket{le="1",kind="major"} 6
nodejs_gc_duration_seconds_bucket{le="2",kind="major"} 6
nodejs_gc_duration_seconds_bucket{le="5",kind="major"} 6
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="major"} 6
nodejs_gc_duration_seconds_sum{kind="major"} 0.1958034448623657
nodejs_gc_duration_seconds_count{kind="major"} 6
nodejs_gc_duration_seconds_bucket{le="0.001",kind="weakcb"} 100
nodejs_gc_duration_seconds_bucket{le="0.01",kind="weakcb"} 101
nodejs_gc_duration_seconds_bucket{le="0.1",kind="weakcb"} 101
nodejs_gc_duration_seconds_bucket{le="1",kind="weakcb"} 101
nodejs_gc_duration_seconds_bucket{le="2",kind="weakcb"} 101
nodejs_gc_duration_seconds_bucket{le="5",kind="weakcb"} 101
nodejs_gc_duration_seconds_bucket{le="+Inf",kind="weakcb"} 101
nodejs_gc_duration_seconds_sum{kind="weakcb"} 0.02888743805885315
nodejs_gc_duration_seconds_count{kind="weakcb"} 101

# HELP app_version The service version by package.json
# TYPE app_version gauge
app_version{version="1.23.13",major="1",minor="23",patch="13"} 1

# HELP http_request_duration_seconds Duration of HTTP requests in seconds
# TYPE http_request_duration_seconds histogram

# HELP http_request_size_bytes Size of HTTP requests in bytes
# TYPE http_request_size_bytes histogram

# HELP http_response_size_bytes Size of HTTP response in bytes
# TYPE http_response_size_bytes histogram

# HELP expressjs_number_of_open_connections Number of open connections to the Express.js server
# TYPE expressjs_number_of_open_connections gauge
expressjs_number_of_open_connections 0`

//console.log(s.replace(/[\n]+/g, '').split("# TYPE monitor_status gauge"));
const fetch = require("node-fetch");
async function test() {
    let headers = new fetch.Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(":" + "uk1_19OetFX1JkN2H8YGPIqjO7cY6Q0Y9Yx3U0e7InlD").toString('base64'));
    const metrics = await fetch('http://socalpug.com:3001/metrics', {method:'GET', headers: headers});
    const m = await metrics.text();
    const blocks = m.split("# TYPE monitor_status gauge");
    const data = blocks[1].split('\n');
    for (const s of data) {
        if (s.length == 0) {
            continue;
        } else {
            const chunks = s.split(' ');
            if (chunks.length < 2) {
                continue;
            } else {
                var monitor = chunks[0];
                var nameBlock = monitor.split("monitor_status{monitor_name=");
                if (nameBlock.length < 2) {
                    continue;
                } else {
                    if (nameBlock.length < 2) {
                        continue;
                    } else {
                        var name = nameBlock[1].split('"');
                        var trueName = name[1];
                        console.log(trueName);
                    }
                    var status = chunks[1];
                    console.log(status);
                }
            }

   //         const pieces = chunks.split("monitor_name=")
      //      if (pieces.length == 0) {
     //           continue;
      //      } else {
      //          console.log(pieces);
       //     }
        }
    }

}

test();