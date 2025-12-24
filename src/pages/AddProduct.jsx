import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Package,
    CheckCircle,
    Upload,
    Warehouse,
    Truck,
    Store,
    ImagePlus,
    ChevronLeft,
    ChevronRight,
    Check,
    ArrowRight,
    Plus,
    Trash2,
    Info
} from 'lucide-react';

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const wizardSteps = [
    { id: 1, title: 'المعلومات', icon: Package },
    { id: 2, title: 'الحالة', icon: CheckCircle },
    { id: 3, title: 'الصور', icon: ImagePlus },
    { id: 4, title: 'المواصفات', icon: Package },
    { id: 5, title: 'طريقة البيع', icon: Truck },
    { id: 6, title: 'المخزون', icon: Warehouse },
    { id: 7, title: 'التسعير', icon: Package },
];

const sellingMethods = [
    {
        id: 'platform_full',
        title: 'بيع وشحن المنصة',
        subtitle: 'نحن نتولى التخزين والشحن والدعم (Platform Stock)',
        label: 'مخزون المنصة',
        icon: Warehouse,
        color: 'blue'
    },
    {
        id: 'platform_ship',
        title: 'شحن المنصة',
        subtitle: 'احتفظ بالمخزون، نحن نستلم الطلبات ونشحنها',
        label: 'مخزون التاجر',
        icon: Truck,
        color: 'sky'
    },
    {
        id: 'self_ship',
        title: 'شحن ذاتي',
        subtitle: 'أنت تتولى التخزين والشحن للعميل مباشرة',
        label: 'مخزون التاجر',
        icon: Store,
        color: 'purple'
    },
];

export default function AddProduct() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const wizardStep = parseInt(searchParams.get('step') || '1');

    const setWizardStep = (step) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('step', step.toString());
            return newParams;
        });
    };

    // Form State
    const [selectedSellingMethod, setSelectedSellingMethod] = useState('platform_full');
    const [selectedCondition, setSelectedCondition] = useState('new');
    const [hasBrand, setHasBrand] = useState(true);
    const [bulkPricing, setBulkPricing] = useState([]);
    const [flexibleSpecs, setFlexibleSpecs] = useState([{ name: '', value: '' }]);

    const handleCancel = () => {
        navigate('/products');
    };

    const handleSave = () => {
        // TODO: Save product logic
        navigate('/products');
    };

    const addBulkPricingRule = () => {
        setBulkPricing([...bulkPricing, { qty: '', price: '' }]);
    };

    const removeBulkPricingRule = (index) => {
        setBulkPricing(bulkPricing.filter((_, i) => i !== index));
    };

    const addFlexibleSpec = () => {
        setFlexibleSpecs([...flexibleSpecs, { name: '', value: '' }]);
    };

    const removeFlexibleSpec = (index) => {
        setFlexibleSpecs(flexibleSpecs.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-4 h-[calc(100vh-100px)] overflow-hidden">
            {/* Page Header */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCancel}
                        className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
                    >
                        <ArrowRight size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">إضافة منتج جديد</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-slate-500">الخطوة {wizardStep} من 7</span>
                            <span className="text-sm font-medium text-blue-600">• {wizardSteps.find(s => s.id === wizardStep)?.title}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 bg-white">حفظ كمسودة</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1 overflow-hidden min-h-0">
                {/* Steps Sidebar */}
                <div className="lg:col-span-3 space-y-6 overflow-y-auto h-full pr-1">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-0">
                            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible">
                                {wizardSteps.map((step, idx) => {
                                    const StepIcon = step.icon;
                                    const isActive = wizardStep === step.id;
                                    const isCompleted = wizardStep > step.id;
                                    return (
                                        <div
                                            key={step.id}
                                            className={`flex items-center gap-3 p-4 border-b border-slate-100 last:border-0 cursor-pointer transition-colors ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                                                }`}
                                            onClick={() => setWizardStep(step.id)}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200' :
                                                isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                {isCompleted ? <Check size={18} /> : <span>{step.id}</span>}
                                            </div>
                                            <div className="hidden lg:block">
                                                <p className={`font-semibold text-sm ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>{step.title}</p>
                                                {isActive && <p className="text-xs text-blue-500 mt-0.5">قيد التعديل</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 h-full flex flex-col bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">

                    {/* Scrollable Form Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">

                        {/* Step 1: Basic Info */}
                        {wizardStep === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">معلومات المنتج الأساسية</h3>
                                    <p className="text-slate-500">أدخل اسم المنتج، الفئة، والعلامة التجارية بدقة لتحسين ظهور المنتج في البحث.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-slate-700">اسم المنتج (بالكامل) *</Label>
                                        <Input placeholder="مثال: سماعة رأس بلوتوث سوني WH-1000XM5 مانعة للضوضاء - أسود" className="h-12 text-lg" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700">الفئة الرئيسية *</Label>
                                        <Select>
                                            <SelectTrigger className="h-11 bg-slate-50"><SelectValue placeholder="اختر الفئة" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="electronics">إلكترونيات</SelectItem>
                                                <SelectItem value="fashion">أزياء</SelectItem>
                                                <SelectItem value="home">المنزل والمطبخ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700">الفئة الفرعية *</Label>
                                        <Select>
                                            <SelectTrigger className="h-11 bg-slate-50"><SelectValue placeholder="اختر الفئة الفرعية" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="headphones">سماعات رأس</SelectItem>
                                                <SelectItem value="speakers">مكبرات صوت</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-4 md:col-span-2 border p-5 rounded-xl border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Store className="text-slate-400" size={20} />
                                                <Label className="text-slate-900 font-semibold text-base">العلامة التجارية</Label>
                                            </div>
                                            <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-lg">
                                                <button
                                                    onClick={() => setHasBrand(false)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${!hasBrand ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                                                >
                                                    لا يوجد
                                                </button>
                                                <button
                                                    onClick={() => setHasBrand(true)}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${hasBrand ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
                                                >
                                                    يوجد علامة تجارية
                                                </button>
                                            </div>
                                        </div>

                                        {hasBrand && (
                                            <div className="grid md:grid-cols-2 gap-6 pt-2 animate-in slide-in-from-top-2">
                                                <div className="space-y-2">
                                                    <Label className="text-slate-600 text-xs uppercase tracking-wider">اسم البراند</Label>
                                                    <Input placeholder="مثال: Sony" className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-slate-600 text-xs uppercase tracking-wider">الشركة المصنعة</Label>
                                                    <Input placeholder="مثال: Sony Corporation" className="h-11" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700">بلد المنشأ</Label>
                                        <Select>
                                            <SelectTrigger className="h-11"><SelectValue placeholder="اختر الدولة" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                                                <SelectItem value="cn">الصين</SelectItem>
                                                <SelectItem value="us">الولايات المتحدة</SelectItem>
                                                <SelectItem value="eg">مصر</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700 flex items-center gap-2">
                                            كود التخزين (SKU) <Badge variant="secondary" className="text-[10px] font-normal">اختياري</Badge>
                                        </Label>
                                        <Input placeholder="XXX-XXX-XXX" className="h-11 font-mono uppercase" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Condition */}
                        {wizardStep === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">حالة المنتج</h3>
                                    <p className="text-slate-500">اختر الحالة الأنسب للمنتج لضمان رضا العملاء وتقليل المرتجعات.</p>
                                </div>

                                <div className="grid md:grid-cols-1 gap-4 max-w-2xl">
                                    {['new', 'open_box', 'used'].map((cond) => (
                                        <div
                                            key={cond}
                                            onClick={() => setSelectedCondition(cond)}
                                            className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${selectedCondition === cond
                                                ? 'border-blue-600 bg-blue-50/30'
                                                : 'border-slate-200 bg-white hover:border-slate-300'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedCondition === cond ? 'border-blue-600' : 'border-slate-300'
                                                }`}>
                                                {selectedCondition === cond && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 text-lg">
                                                    {cond === 'new' ? 'جديد (New)' : cond === 'open_box' ? 'مفتوح الصندوق (Open Box)' : 'مستعمل (Used)'}
                                                </h4>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {cond === 'new' && 'المنتج جديد تماماً في تغليفه الأصلي مع كامل الملحقات.'}
                                                    {cond === 'open_box' && 'تم فتح العلبة فقط، المنتج جديد ولم يستخدم.'}
                                                    {cond === 'used' && 'المنتج مستعمل ويعمل بشكل ممتاز. قد يحتوي على خدوش.'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {(selectedCondition === 'used' || selectedCondition === 'open_box') && (
                                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                                        <Label className="text-slate-900 block font-semibold flex items-center gap-2">
                                            <Info size={16} /> وصف حالة المنتج والملاحظات
                                        </Label>
                                        <Textarea
                                            placeholder="اكتب وصفاً دقيقاً لأي عيوب أو ملحقات مفقودة..."
                                            className="bg-white min-h-[120px]"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 3: Images */}
                        {wizardStep === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">صور المنتج</h3>
                                    <p className="text-slate-500">يفضل إضافة صور بخلفية بيضاء وبدقة عالية.</p>
                                </div>

                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer bg-slate-50/50">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                                        <Upload size={32} />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900">اضغط لرفع الصور</h4>
                                    <p className="text-slate-500 mt-2 text-sm">أو اسحب وأفلت الملفات هنا</p>
                                    <p className="text-xs text-slate-400 mt-4">JPG, PNG, WEBP (Max 5MB)</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">وصف قصير للمنتج</Label>
                                        <Input className="h-11" placeholder="وصف مختصر يظهر تحت اسم المنتج" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">وصف تفصيلي</Label>
                                        <Textarea className="min-h-[200px]" placeholder="المواصفات، المميزات، طريقة الاستخدام..." />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Specs */}
                        {wizardStep === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">المواصفات التقنية</h3>
                                    <p className="text-slate-500">أضف المواصفات الفنية لمساعدة العميل في اتخاذ القرار.</p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-600 text-xs uppercase">الوزن (كجم)</Label>
                                        <Input type="number" placeholder="0.0" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-600 text-xs uppercase">الطول (سم)</Label>
                                        <Input type="number" placeholder="0" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-600 text-xs uppercase">العرض (سم)</Label>
                                        <Input type="number" placeholder="0" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-600 text-xs uppercase">الارتفاع (سم)</Label>
                                        <Input type="number" placeholder="0" className="h-11" />
                                    </div>
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label className="text-slate-600 text-xs uppercase">اللون</Label>
                                        <Input placeholder="مثال: أسود ملكي" className="h-11" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-slate-900">مواصفات إضافية</h4>
                                        <Button variant="outline" size="sm" onClick={addFlexibleSpec} className="gap-2">
                                            <Plus size={16} /> إضافة خاصية
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {flexibleSpecs.map((spec, index) => (
                                            <div key={index} className="flex gap-4">
                                                <Input
                                                    placeholder="الاسم (مثال: سعة الذاكرة)"
                                                    value={spec.name}
                                                    onChange={(e) => {
                                                        const n = [...flexibleSpecs];
                                                        n[index].name = e.target.value;
                                                        setFlexibleSpecs(n);
                                                    }}
                                                    className="flex-1 h-11"
                                                />
                                                <Input
                                                    placeholder="القيمة (مثال: 128GB)"
                                                    value={spec.value}
                                                    onChange={(e) => {
                                                        const n = [...flexibleSpecs];
                                                        n[index].value = e.target.value;
                                                        setFlexibleSpecs(n);
                                                    }}
                                                    className="flex-1 h-11"
                                                />
                                                <Button variant="ghost" size="icon" className="h-11 w-11 text-red-500" onClick={() => removeFlexibleSpec(index)}>
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Sales Method */}
                        {wizardStep === 5 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">طريقة البيع والشحن</h3>
                                    <p className="text-slate-500">كيف تريد شحن وتسليم هذا المنتج للعملاء؟</p>
                                </div>
                                <div className="grid gap-4">
                                    {sellingMethods.map((method) => {
                                        const MethodIcon = method.icon;
                                        const isSelected = selectedSellingMethod === method.id;
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={() => setSelectedSellingMethod(method.id)}
                                                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-6 ${isSelected
                                                    ? 'border-blue-600 bg-blue-50/40'
                                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                                    }`}
                                            >
                                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    <MethodIcon size={28} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h5 className="font-bold text-lg text-slate-900">{method.title}</h5>
                                                        {isSelected && <CheckCircle size={24} className="text-blue-600 bg-white rounded-full" />}
                                                    </div>
                                                    <p className="text-slate-500 mb-3">{method.subtitle}</p>
                                                    <Badge variant="secondary" className={`${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                                        {method.label}
                                                    </Badge>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 6: Inventory */}
                        {wizardStep === 6 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">إدارة المخزون</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 col-span-2 flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-500">
                                            <Warehouse size={24} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 text-lg">مستودع الشحن</p>
                                            <p className="text-sm text-blue-600 font-medium mt-1">
                                                {sellingMethods.find(m => m.id === selectedSellingMethod)?.label || 'غير محدد'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-slate-700 font-medium">الكمية المتوفرة</Label>
                                        <div className="relative">
                                            <Input type="number" placeholder="0" className="h-12 font-mono text-lg pl-12" />
                                            <div className="absolute left-3 top-3.5 text-slate-400 text-sm font-medium">قطعة</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-slate-700 font-medium">تنبيه انخفاض المخزون</Label>
                                        <div className="relative">
                                            <Input type="number" placeholder="5" className="h-12 font-mono text-lg pl-12" />
                                            <div className="absolute left-3 top-3.5 text-slate-400 text-sm font-medium">قطعة</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 7: Pricing */}
                        {wizardStep === 7 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border-b border-slate-100 pb-5">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">التسعير والعروض</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-slate-700">سعر البيع الأساسي *</Label>
                                        <div className="relative">
                                            <Input type="number" placeholder="0.00" className="h-12 text-lg font-bold" />
                                            <span className="absolute left-3 top-3.5 text-slate-500 text-sm font-medium">ج.م</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-slate-700">سعر العرض (اختياري)</Label>
                                        <div className="relative">
                                            <Input type="number" placeholder="0.00" className="h-12 text-lg" />
                                            <span className="absolute left-3 top-3.5 text-slate-500 text-sm font-medium">ج.م</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-slate-700">أقل كمية للطلب</Label>
                                        <Input type="number" placeholder="1" className="h-12" />
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                                        <h4 className="font-semibold text-slate-800">أسعار الجملة (Bulk Pricing)</h4>
                                        <Button variant="ghost" size="sm" onClick={addBulkPricingRule} className="text-blue-600 gap-2 hover:bg-white hover:text-blue-700">
                                            <Plus size={16} /> إضافة شريحة
                                        </Button>
                                    </div>
                                    <div className="p-6 space-y-4 bg-white">
                                        {bulkPricing.length === 0 && (
                                            <div className="text-center py-6">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                                    <Package size={20} />
                                                </div>
                                                <p className="text-sm text-slate-500">أضف شرائح أسعار لبيع الكميات بسعر مخفض</p>
                                            </div>
                                        )}
                                        {bulkPricing.map((rule, idx) => (
                                            <div key={idx} className="flex items-center gap-4 animate-in slide-in-from-top-2">
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-sm font-medium text-slate-600">من</span>
                                                    <Input type="number" className="h-10 w-24 text-center" />
                                                    <span className="text-sm font-medium text-slate-600">قطعة</span>
                                                </div>
                                                <ArrowRight size={16} className="text-slate-300" />
                                                <div className="flex items-center gap-2 flex-1">
                                                    <span className="text-sm font-medium text-slate-600">السعر</span>
                                                    <Input type="number" className="h-10 w-28 text-center font-bold text-slate-900" />
                                                    <span className="text-sm font-medium text-slate-600">ج.م</span>
                                                </div>
                                                <Button size="icon" variant="ghost" className="text-slate-400 hover:text-red-500" onClick={() => removeBulkPricingRule(idx)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-4">
                                    <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={24} />
                                    <div>
                                        <h5 className="font-bold text-emerald-800 text-lg">المنتج جاهز للنشر</h5>
                                        <p className="text-emerald-700 mt-1">
                                            عند نشر المنتج، سيتم مراجعته من قبل فريق الجودة خلال 24 ساعة. تأكد من صحة جميع البيانات.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Integrated Footer */}
                    <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0">
                        {/* Progress Bar (Right Side in RTL) */}
                        <div className="hidden md:flex flex-col items-start w-48 lg:w-64">
                            <div className="flex items-center justify-between w-full mb-1">
                                <span className="text-xs font-semibold text-slate-700">إكمال البيانات</span>
                                <span className="text-xs font-bold text-blue-600">{Math.round((wizardStep / 7) * 100)}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${(wizardStep / 7) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 flex-1 md:flex-none justify-end">
                            <Button
                                variant="outline"
                                onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : handleCancel()}
                                className="h-11 px-6 border-slate-300 text-slate-700 hover:bg-white"
                            >
                                {wizardStep > 1 ? 'السابق' : 'إلغاء'}
                            </Button>

                            <Button
                                onClick={() => wizardStep < 7 ? setWizardStep(wizardStep + 1) : handleSave()}
                                className="h-11 px-8 bg-blue-600 hover:bg-blue-700 shadow-sm min-w-[120px]"
                            >
                                {wizardStep < 7 ? (
                                    <span className="flex items-center gap-2">
                                        التالي <ChevronLeft size={18} />
                                    </span>
                                ) : 'حفظ ونشر'}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

