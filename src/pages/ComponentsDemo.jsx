export default function ComponentsDemo() {
    return (
        <div style={{ padding: '40px', fontFamily: 'Cairo, sans-serif' }} dir="rtl">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                اختبار المكونات
            </h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                إذا ظهرت هذه الرسالة، معناها الصفحة شغالة والمشكلة في المكونات
            </p>

            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                marginBottom: '20px'
            }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
                    بطاقة تجريبية
                </h2>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                    هذا نص تجريبي للتأكد من أن الصفحة تعمل بشكل صحيح
                </p>
            </div>

            <button style={{
                background: '#0554FF',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
            }}>
                زر تجريبي
            </button>
        </div>
    )
}
